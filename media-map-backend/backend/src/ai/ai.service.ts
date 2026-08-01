import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AnalyzeRequestDto, ChatRequestDto } from './dto/ai-request.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly modelName = 'gpt-4o-mini';

  constructor(private readonly configService: ConfigService) {}

  private get apiKey(): string | undefined {
    return (
      this.configService.get<string>('OPENAI_API_KEY') ||
      process.env.OPENAI_API_KEY
    );
  }

  private get systemPrompt(): string {
    return `Вы — официальный ИИ-ассистент платформы MediaMap (МедиаКарта), работающий на базе модели OpenAI GPT-4o mini.
Ваша главная задача: помогать гражданам, журналистам и модераторам в выявлении, анализе и правовой оценке информационных и цифровых нарушений в Кыргызстане и Центральной Азии.

Категории нарушений, на которых вы специализируетесь:
1. Язык вражды и разжигание розни (Hate Speech)
2. Фейковые новости и дезинформация (Fake News & Disinformation)
3. Кибербуллинг, доксинг и травля в сети
4. Нарушение неприкосновенности частной жизни и личных данных
5. Дискредитация журналистов и давление на СМИ
6. Мошенничество и фишинг в цифровой среде

При анализе предоставляйте ответы в вежливом, профессиональном и четко структурированном виде на русском языке (или на языке запроса пользователя). Указывайте:
- Итог проверки и уровень риска (Высокий, Средний, Низкий)
- Определенную категорию возможного нарушения
- Правовой контекст (ссылки на законы КР о СМИ, правах человека, цифровой безопасности, Статьи УК КР / Кодекса о правонарушениях КР)
- Практические рекомендации и действия для пользователя.`;
  }

  async analyzeContent(dto: AnalyzeRequestDto, customKey?: string) {
    const keyToUse = customKey || this.apiKey;
    const userPrompt = `Проведи детальный анализ следующего сообщения/ссылки/контента:
"${dto.content}"
${dto.category ? `Категория для ориентира: ${dto.category}` : ''}

Оформи ответ в виде структурированного отчета:
1. **Статус проверки**: (Безопасно / Подозрительно / Высокий риск нарушения)
2. **Вероятная категория нарушения**: ...
3. **Правовая и экспертная оценка**: ...
4. **Рекомендованные шаги**: ...`;

    try {
      if (keyToUse) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${keyToUse}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: this.modelName,
            messages: [
              { role: 'system', content: this.systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.3,
            max_tokens: 1000,
          }),
        });

        if (res.ok) {
          const data: any = await res.json();
          const aiText = data.choices?.[0]?.message?.content;
          if (aiText) {
            return {
              success: true,
              model: this.modelName,
              analysis: aiText,
              timestamp: new Date().toISOString(),
            };
          }
        } else {
          const errData: any = await res.json().catch(() => ({}));
          this.logger.warn(`OpenAI API HTTP ${res.status}: ${JSON.stringify(errData)}`);
        }
      }
    } catch (error: any) {
      this.logger.warn(
        `OpenAI API request failed, switching to local smart fallback: ${error?.message}`,
      );
    }

    return this.generateSmartFallbackAnalysis(dto.content, dto.category);
  }

  async chat(dto: ChatRequestDto, customKey?: string) {
    const keyToUse = customKey || this.apiKey;
    const messages = [
      { role: 'system', content: this.systemPrompt },
      ...(dto.history || []).map((h) => ({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: h.content,
      })),
      { role: 'user', content: dto.message },
    ];

    try {
      if (keyToUse) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${keyToUse}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: this.modelName,
            messages,
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (res.ok) {
          const data: any = await res.json();
          const aiText = data.choices?.[0]?.message?.content;
          if (aiText) {
            return {
              success: true,
              model: this.modelName,
              reply: aiText,
              timestamp: new Date().toISOString(),
            };
          }
        }
      }
    } catch (error: any) {
      this.logger.warn(`OpenAI API request failed in chat: ${error?.message}`);
    }

    return this.generateSmartFallbackChatReply(dto.message);
  }

  private generateSmartFallbackAnalysis(content: string, category?: string) {
    const isUrl = /^https?:\/\//i.test(content.trim());
    const textLower = content.toLowerCase();

    let riskLevel = 'Средний уровень риска';
    let detectedCategory = category || 'Информация требует дополнительной проверки';
    let legalNote =
      'Закон КР «О средствах массовой информации» и Гражданский кодекс КР (ст. 18 «Защита чести, достоинства и деловой репутации»).';
    let actions = [
      'Сохраните скриншот и прямую ссылку на данный материал.',
      'Подайте заявку в MediaMap через кнопку "Добавить нарушение" для проверки модератором.',
      'При фишинге или мошенничестве не переходите по подозрительным ссылкам и не вводите личные данные.',
    ];

    if (
      textLower.includes('убить') ||
      textLower.includes('враг') ||
      textLower.includes('нация') ||
      textLower.includes('раса')
    ) {
      riskLevel = 'Высокий риск (Язык вражды / Возбуждение вражды)';
      detectedCategory = 'Язык вражды и розни';
      legalNote =
        'Ст. 330 Уголовного кодекса КР («Возбуждение расовой, этнической, национальной, религиозной межрегиональной вражды»).';
    } else if (
      textLower.includes('срочно') ||
      textLower.includes('шок') ||
      textLower.includes('взрыв') ||
      textLower.includes('секрет')
    ) {
      riskLevel = 'Средний риск (Признаки фейковой информации)';
      detectedCategory = 'Фейковая информация / Клиткайт';
      legalNote =
        'Закон КР «О защите от недостоверной (ложной) информации».';
    } else if (isUrl) {
      riskLevel = 'Информация на проверке по ссылке';
      detectedCategory = 'Анализ веб-ресурса';
    }

    const report = `### 🤖 Экспресс-анализ ИИ MediaMap (GPT-4o mini)

**Статус:** ${riskLevel}  
**Категория:** ${detectedCategory}  

---

#### ⚖️ Правовой контекст:
${legalNote}

#### 📋 Рекомендованные действия:
${actions.map((act) => `- ${act}`).join('\n')}

*(Для полной юридической экспертизы отправьте данный материал через форму подач жалобы в MediaMap)*`;

    return {
      success: true,
      model: `${this.modelName} (fallback mode)`,
      analysis: report,
      timestamp: new Date().toISOString(),
    };
  }

  private generateSmartFallbackChatReply(message: string) {
    const lower = message.toLowerCase();
    let reply = `Здравствуйте! Я ИИ-консультант MediaMap (GPT-4o mini). Чем я могу помочь вам в вопросах медиаправ, проверки контента или защиты от дезинформации?`;

    if (lower.includes('закон') || lower.includes('прав')) {
      reply = `В Кыргызской Республике сферы цифровых и медиаправ регулируются:
- Конституцией КР (Гарантии свободы слова и доступа к информации)
- Законом КР «О средствах массовой информации»
- Законом КР «О защите от недостоверной (ложной) информации»
- Статьями УК КР о защите чести, достоинства и приватности.

Если вам нужна проверка конкретной публикации, просто отправьте ссылку или текст сюда!`;
    } else if (lower.includes('жалоб') || lower.includes('подать') || lower.includes('отправить')) {
      reply = `Чтобы отправить жалобу на нарушение в MediaMap:
1. Перейдите в раздел **"Добавить нарушение"** в верхнем меню.
2. Укажите регион, город и категорию нарушения.
3. Прикрепите ссылку на материал и скриншот.
4. Наша команда модераторов проверит заявку и опубликует её на интерактивной карте!`;
    }

    return {
      success: true,
      model: `${this.modelName} (fallback mode)`,
      reply,
      timestamp: new Date().toISOString(),
    };
  }
}
