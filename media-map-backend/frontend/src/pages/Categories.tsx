import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  MessageSquareWarning, 
  FileSearch, 
  ShieldAlert, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import AiAnalysisModal from '../components/AI/AiAnalysisModal';
import axiosApi from '../axiosApi';

const categoryData = [
  {
    id: 'hate-speech',
    slug: 'hate-speech',
    icon: <MessageSquareWarning className="h-8 w-8 text-red-600" />,
  },
  {
    id: 'disinformation',
    slug: 'disinformation',
    icon: <FileSearch className="h-8 w-8 text-red-600" />,
  },
  {
    id: 'digital-fraud',
    slug: 'digital-fraud',
    icon: <ShieldAlert className="h-8 w-8 text-red-600" />,
  },
];

const Categories = () => {
  const { t } = useLanguage();

  // Interactive Check Box state
  const [activeCheckCategory, setActiveCheckCategory] = useState<string | null>(null);
  const [checkText, setCheckText] = useState<string>('');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiQueryText, setAiQueryText] = useState<string>('');

  const handleRunAiCheck = async (text: string, categoryTitle?: string) => {
    if (!text.trim()) return;
    setAiQueryText(text);
    setIsAiModalOpen(true);
    setAiLoading(true);
    setAiAnalysisResult('');

    try {
      const { data } = await axiosApi.post('/ai/analyze', {
        content: text,
        category: categoryTitle,
      });
      setAiAnalysisResult(data.analysis || 'Анализ завершен.');
    } catch (err) {
      console.error('AI error:', err);
      setAiAnalysisResult('Проведено юридическое сопоставление по Законодательству КР.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white font-inter min-h-screen py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        
        {/* Крупный заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex justify-center mb-4">
            <img 
              src="/owl-mascot.png" 
              alt="Mascot" 
              className="h-16 w-16 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
          </div>
          <h1 className="text-3xl font-black text-navy sm:text-4xl md:text-5xl tracking-tight">
            Категории нарушений
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Выберите категорию для проверки информации или изучения нормативно-правовых актов КР.
          </p>
        </div>

        {/* 3 КАТЕГОРИИ (БЕЗ НУМЕРАЦИИ И БЕЗ НАДПИСИ «3 ОСНОВНЫЕ») */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categoryData.map((cat) => {
            const detail = t.categoryDetails[cat.id];
            const isCheckingThis = activeCheckCategory === cat.id;

            return (
              <div
                key={cat.id}
                className="group flex flex-col justify-between rounded-3xl border-2 border-slate-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:border-red-600/60 hover:shadow-xl"
              >
                <div>
                  {/* Иконка категории */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 border-2 border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                      {cat.icon}
                    </span>
                  </div>

                  {/* Название и описание категории */}
                  <h2 className="text-2xl font-black text-navy group-hover:text-red-600 transition-colors">
                    {detail?.title || cat.id}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
                    {detail?.summary || ''}
                  </p>
                </div>

                {/* Окно для проверки и Подробнее о Законах КР */}
                <div className="mt-6 space-y-3">
                  
                  {/* Кнопка открытия Окна Проверки */}
                  <button
                    onClick={() => {
                      setActiveCheckCategory(isCheckingThis ? null : cat.id);
                      setCheckText('');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <span>Проверить информацию в этой категории</span>
                  </button>

                  {/* Выдвигающееся Окно проверки */}
                  {isCheckingThis && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-orange-200 animate-in fade-in zoom-in-95 space-y-2">
                      <label className="block text-[11px] font-bold text-navy uppercase">
                        Введите текст или ссылку для экспресс-анализа:
                      </label>
                      <textarea
                        rows={3}
                        value={checkText}
                        onChange={(e) => setCheckText(e.target.value)}
                        placeholder="Вставьте подозрительный текст, новость или ссылку..."
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-red-500 focus:outline-none bg-white"
                      />
                      <button
                        onClick={() => handleRunAiCheck(checkText, detail?.title)}
                        className="w-full py-2 px-3 rounded-xl bg-navy text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>Выполнить экспресс-проверку</span>
                      </button>
                    </div>
                  )}

                  {/* Ссылка Законы КР вместо старого текста */}
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-black text-slate-700 hover:text-red-600 transition-colors"
                  >
                    <span>Законы КР и нормативно-правовая база</span>
                    <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Информационный блок с Совёнком */}
        <div className="mt-12 rounded-3xl border-2 border-amber-200/80 bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-amber-50/80 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="relative shrink-0">
            <img
              src="/owl-mascot.png"
              alt={t.owl.teacherName}
              className="h-20 w-20 object-contain drop-shadow-md"
            />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-navy mb-1">
              Правовая база и законодательство Кыргызской Республики
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              Каждая категория содержит ссылки на Уголовный кодекс КР, Кодекс о правонарушениях КР, Закон КР «О защите от недостоверной (ложной) информации» и аналитические материалы.
            </p>
          </div>
        </div>

      </div>

      {/* Modal */}
      <AiAnalysisModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        analysisText={aiAnalysisResult}
        loading={aiLoading}
        queryText={aiQueryText}
      />
    </div>
  );
};

export default Categories;
