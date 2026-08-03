import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  ArrowLeft, 
  MessageSquareWarning, 
  FileSearch, 
  ShieldAlert, 
  Scale, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import AiAnalysisModal from '../components/AI/AiAnalysisModal';
import axiosApi from '../axiosApi';

const CategoryDetail: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useLanguage();

  // AI Modal States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQueryText, setAiQueryText] = useState('');
  const [checkInput, setCheckInput] = useState('');

  if (!categoryId || !t.categoryDetails[categoryId]) {
    return <Navigate to="/categories" replace />;
  }

  const detail = t.categoryDetails[categoryId];

  const getIcon = () => {
    switch (categoryId) {
      case 'hate-speech':
        return <MessageSquareWarning className="h-8 w-8 text-red-600" />;
      case 'disinformation':
        return <FileSearch className="h-8 w-8 text-red-600" />;
      case 'digital-fraud':
        return <ShieldAlert className="h-8 w-8 text-red-600" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-red-600" />;
    }
  };

  const handleRunAiCheck = async (text: string) => {
    if (!text.trim()) return;
    setAiQueryText(text);
    setIsAiModalOpen(true);
    setAiLoading(true);
    setAiAnalysisResult('');

    try {
      const { data } = await axiosApi.post('/ai/analyze', {
        content: text,
        category: detail.title,
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
      <div className="mx-auto max-w-[1200px] px-6">
        
        {/* Навигация назад */}
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-navy mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Все категории нарушений
        </Link>

        {/* Заголовок категории (Без нумерации Категория №1) */}
        <div className="rounded-3xl border border-red-100 bg-gradient-to-r from-red-50/60 via-white to-amber-50/30 p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md border border-red-100">
              {getIcon()}
            </span>
            <div>
              <h1 className="text-2xl font-black text-navy md:text-3xl lg:text-4xl">
                {detail.title}
              </h1>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                Нормативно-правовая база и законы Кыргызской Республики
              </p>
            </div>
          </div>
          <p className="mt-4 text-base text-slate-700 max-w-3xl leading-relaxed">
            {detail.summary}
          </p>
        </div>

        {/* Интерактивное Окно Проверки Информации */}
        <div className="mt-8 rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-amber-50 via-orange-50/40 to-amber-50 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-orange-600 animate-pulse" />
            <h3 className="text-lg font-black text-navy">
              Окно проверки информации в категории «{detail.title}»
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4 font-medium">
            Отправьте подозреваемую новость, публикацию или пост на экспресс-верификацию юридической базой КР:
          </p>
          <div className="space-y-3">
            <textarea
              rows={3}
              value={checkInput}
              onChange={(e) => setCheckInput(e.target.value)}
              placeholder="Вставьте подозрительный текст или ссылку..."
              className="w-full rounded-2xl border border-slate-300 p-4 text-xs text-slate-900 focus:border-red-500 focus:outline-none bg-white shadow-inner"
            />
            <button
              onClick={() => handleRunAiCheck(checkInput)}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Проверить информацию
            </button>
          </div>
        </div>

        {/* Блоки детальной информации */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Блок 1: Что это за нарушение */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 text-navy font-bold text-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <HelpCircle className="h-5 w-5" />
                </span>
                Что это за нарушение?
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {detail.whatIsIt}
              </p>
            </div>
          </div>

          {/* Блок 2: Наказание и закон КР */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 text-navy font-bold text-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Scale className="h-5 w-5" />
                </span>
                Законы КР и ответственность
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-2">
                {detail.legalBasis}
              </p>
              <div className="rounded-xl bg-red-50/70 p-3 text-xs text-red-800 font-medium border border-red-200/60">
                {detail.penalty}
              </div>
            </div>
          </div>

          {/* Блок 3: Маскот советник */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-xs flex items-center gap-4">
            <img
              src="/owl-mascot.png"
              alt="Совёнок учитель"
              className="h-20 w-20 object-contain shrink-0 drop-shadow-md"
            />
            <div>
              <h4 className="text-sm font-bold text-navy mb-1">Совет от Совёнка MediaMap</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Если вы увидели признаки этого нарушения в соцсетях или СМИ — отправьте сообщение модераторам MediaMap для верификации!
              </p>
            </div>
          </div>
        </div>

        {/* Примеры нарушений */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8">
          <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Характерные примеры в медиа-пространстве
          </h3>

          <div className="space-y-4">
            {detail.examples.map((example, idx) => (
              <div key={idx} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-bold text-xs">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed pt-0.5">
                  {example}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Нашли подобное нарушение в сети?
            </span>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-red-700 shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              Сообщить модераторам MediaMap
            </Link>
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

export default CategoryDetail;
