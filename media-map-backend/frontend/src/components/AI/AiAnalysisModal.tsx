import React from 'react';
import { Bot, X, ShieldAlert, CheckCircle, Scale, Sparkles, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  analysisText: string;
  loading: boolean;
  queryText: string;
}

const AiAnalysisModal: React.FC<Props> = ({
  isOpen,
  onClose,
  analysisText,
  loading,
  queryText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-navy to-indigo-700 rounded-2xl shadow-lg text-white">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-800">
                  ИИ-Анализ MediaMap
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  GPT-4o mini
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Экспертный разбор прав СМИ, недостоверной информации и цифровых рисков
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checked Query Box */}
        <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
            Проверяемый материал / Ссылка:
          </span>
          <p className="text-sm text-slate-700 font-medium truncate italic">
            "{queryText}"
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-4">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                <Bot className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto" />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-slate-800">
                  Модель GPT-4o mini анализирует данные...
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Сверяем с нормативной базой КР и стандартами факчекинга
                </p>
              </div>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-3">
              {analysisText.split('\n').map((line, idx) => {
                if (line.startsWith('### ') || line.startsWith('#### ')) {
                  return (
                    <h4 key={idx} className="text-base font-bold text-slate-800 pt-2 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-indigo-600 inline shrink-0" />
                      {line.replace(/^#+\s*/, '')}
                    </h4>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-4 list-disc text-slate-600">
                      {line.replace(/^- /, '')}
                    </li>
                  );
                }
                if (line.startsWith('**Статус:**')) {
                  return (
                    <div key={idx} className="p-3.5 bg-indigo-50/80 rounded-xl border border-indigo-100 text-indigo-900 font-bold flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-indigo-600 shrink-0" />
                      <span>{line.replace(/\*\*/g, '')}</span>
                    </div>
                  );
                }
                return <p key={idx} className="text-slate-600">{line.replace(/\*\*/g, '')}</p>;
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Проверено алгоритмами GPT-4o mini</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const current = localStorage.getItem('openai_api_key') || '';
                const key = window.prompt('Введите ваш OpenAI API Key (sk-...):', current);
                if (key !== null) {
                  localStorage.setItem('openai_api_key', key.trim());
                  alert(key.trim() ? 'OpenAI API Key сохранен!' : 'OpenAI API Key очищен.');
                }
              }}
              className="px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              title="Настройка ключа OpenAI"
            >
              🔑 Ключ ИИ
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              Закрыть
            </button>
            <a
              href="/new-report"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-navy to-navyCard text-white text-xs font-extrabold shadow-md hover:from-navy hover:to-navy transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Отправить заявку в MediaMap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAnalysisModal;
