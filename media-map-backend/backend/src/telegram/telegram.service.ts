import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramBot } from 'node-telegram-bot-api';
import { classifyText } from './classifier';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TelegramService.name);
  private bot: TelegramBot | null = null;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      this.logger.warn('TELEGRAM_BOT_TOKEN не задан — Telegram-бот не запущен.');
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });

    this.bot.on('message', (msg) => {
      const text = msg.text;
      if (!text) return;

      if (text.startsWith('/start')) {
        this.bot.sendMessage(
          msg.chat.id,
          'Здравствуйте! Отправьте мне текст сообщения, и я проверю, относится ли оно к одной из отслеживаемых категорий нарушений: язык вражды, дезинформация или цифровое мошенничество.',
        );
        return;
      }

      const result = classifyText(text);
      if (result.category) {
        this.bot.sendMessage(
          msg.chat.id,
          `Похоже, это сообщение относится к категории «${result.category}».\n\nОбнаруженные признаки: ${result.matchedKeywords.join(', ')}.\n\nЭто автоматическая предварительная проверка и не заменяет решение модератора.`,
        );
      } else {
        this.bot.sendMessage(
          msg.chat.id,
          'Явных признаков нарушений (язык вражды, дезинформация, цифровое мошенничество) в этом сообщении не найдено.',
        );
      }
    });

    this.bot.on('polling_error', (err) => {
      this.logger.error(`Telegram polling error: ${err.message}`);
    });

    this.logger.log('Telegram-бот запущен и готов проверять сообщения.');
  }

  onModuleDestroy() {
    this.bot?.stopPolling();
  }
}
