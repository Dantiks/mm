import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw } from 'lucide-react';
import axiosApi from '../../axiosApi';
import { DEFAULT_OPENAI_KEY } from '../../utils/constants';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  { label: '⚖️ Законы о СМИ в КР', query: 'Каковы главные законы и статьи о защите свободы слова и СМИ в Кыргызстане?' },
  { label: '🔍 Проверить информацию', query: 'Как быстро отличить дезинформацию и фейковую новость от достоверного факта?' },
  { label: '🚨 Как подать жалобу?', query: 'Какой порядок подачи заявки о нарушении в MediaMap и какие нужны доказательства?' },
];

const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Здравствуйте! Я ваш ИИ-ассистент, работающий на базе модели GPT-4o mini.

Чем я могу помочь?
- Подсказать, как правильно составить и подать заявку на проверку информации
- Проверить статью или посты на признаки нарушений
- Разъяснить законодательство КР в сфере медиа`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      const { data } = await axiosApi.post('/ai/chat', {
        message: query,
        history,
      });

      if (data && data.reply) {
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend AI chat unavailable, attempting direct call fallback:', err);
    }

    // Direct OpenAI API fallback using savedKey or DEFAULT_OPENAI_KEY
    const savedKey = localStorage.getItem('openai_api_key') || DEFAULT_OPENAI_KEY;
    if (savedKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${savedKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'Вы — официальный ИИ-ассистент платформы MediaMap (МедиаКарта), работающий на базе модели OpenAI GPT-4o mini. Ваша главная задача: помогать гражданам и журналистам в вопросах цифровых и медиаправ в Кыргызстане.'
              },
              ...messages.filter(m => m.id !== 'welcome').map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: query }
            ]
          })
        });
        if (res.ok) {
          const resultData = await res.json();
          const reply = resultData.choices?.[0]?.message?.content;
          if (reply) {
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
            setLoading(false);
            return;
          }
        }
      } catch (directErr) {
        console.error('Direct OpenAI chat call error:', directErr);
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Здравствуйте! Запрос обработан ИИ-системой MediaMap. Вы можете нажать кнопку **🔑** вверху чата, чтобы указать ваш личный OpenAI API ключ для доступа к премиум-модели GPT-4o mini.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setLoading(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Чат сброшен. Введите ваш вопрос для **GPT-4o mini**:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-inter">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3.5 px-5 py-3 rounded-full bg-gradient-to-r from-red-600 via-orange-500 via-amber-500 to-indigo-700 text-white shadow-2xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 border border-white/30"
        >
          <div className="relative h-8 w-8 shrink-0">
            <img
              src="/owl-mascot.png"
              alt="Совёнок MediaMap"
              className="h-full w-full object-contain drop-shadow-md group-hover:scale-110 transition-transform"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-red-600 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-red-600" />
          </div>
          <div className="text-left">
            <span className="text-sm font-black tracking-tight block drop-shadow-xs">Совёнок MediaMap</span>
            <p className="text-[10px] text-amber-100 font-bold opacity-90">Консультации и проверка</p>
          </div>
        </button>
      )}

      {/* Expandable Chat Drawer Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-red-600 via-orange-500 via-amber-500 to-indigo-700 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md h-14 w-14 flex items-center justify-center">
                <img src="/owl-mascot.png" alt="Совёнок MediaMap" className="h-12 w-12 object-contain drop-shadow-xs" />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight drop-shadow-xs">Совёнок MediaMap</h3>
                <p className="text-[11px] text-amber-100 font-semibold opacity-90">ИИ ассистент Совенок MediaMap</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const current = localStorage.getItem('openai_api_key') || '';
                  const key = window.prompt('Введите ваш OpenAI API Key (sk-...):', current);
                  if (key !== null) {
                    localStorage.setItem('openai_api_key', key.trim());
                    alert(key.trim() ? 'OpenAI API Key сохранен!' : 'OpenAI API Key очищен.');
                  }
                }}
                title="Настройки OpenAI Key"
                className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold flex items-center gap-1"
              >
                🔑
              </button>
              <button
                onClick={handleResetChat}
                title="Сбросить диалог"
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {PRESET_PROMPTS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(preset.query)}
                className="px-3 py-1.5 rounded-full bg-white text-slate-600 text-[11px] font-semibold border border-slate-200 whitespace-nowrap hover:border-indigo-400 hover:text-indigo-600 hover:shadow-xs transition-all shrink-0"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0 shadow-sm border border-navy/20 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-navy text-white rounded-br-none'
                      : 'bg-white text-slate-700 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content.replace(/\*\*/g, '')}</div>
                  <div
                    className={`text-[9px] mt-1.5 text-right font-medium ${
                      msg.role === 'user' ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                <div className="w-6 h-6 rounded-lg bg-navy/10 flex items-center justify-center animate-spin">
                  <Sparkles className="w-3.5 h-3.5 text-navy" />
                </div>
                <span>GPT-4o mini печает ответ...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Спросить GPT-4o mini..."
              className="flex-1 rounded-xl bg-slate-100 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="p-2.5 rounded-xl bg-navy text-white disabled:opacity-40 hover:bg-indigo-900 transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiAssistantWidget;
