import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  PlayCircle,
  FileText,
  Wrench,
  Sparkles,
  ArrowRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import AiAnalysisModal from '../components/AI/AiAnalysisModal';
import axiosApi from '../axiosApi';
import { DEFAULT_OPENAI_KEY } from '../utils/constants';

import { TelegramIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from '../components/Common/SocialIcons';
import SiteSearchModal from '../components/Search/SiteSearchModal';

import NewsAggregatorCarousel, { NewsItem } from '../components/News/NewsAggregatorCarousel';
import NewsDetailModal, { DetailedNewsItem } from '../components/News/NewsDetailModal';
import EditableText from '../components/CMS/EditableText';

// Совята для каждой категории: поза подобрана по смыслу
const categoryOwls = [
  { src: '/owl-stop.png', alt: 'Язык вражды — сова предупреждает' },   // рука стоп + !
  { src: '/owl-think.png', alt: 'Дезинформация — сова анализирует' },  // думает
  { src: '/owl-cross.png', alt: 'Мошенничество — строгая сова' },      // скрещены руки
];

const categorySlugs = ['hate-speech', 'disinformation', 'digital-fraud'];

const resourceIcons = [
  <CheckSquare className="h-4 w-4" key="check" />,
  <PlayCircle className="h-4 w-4" key="play" />,
  <FileText className="h-4 w-4" key="file" />,
  <Wrench className="h-4 w-4" key="wrench" />,
  <Sparkles className="h-4 w-4" key="sparkles" />,
];

const socials = [
  { label: 'Telegram', href: 'https://t.me/mediamap_kg', color: 'bg-[#229ED9]', icon: <TelegramIcon className="h-4 w-4" /> },
  { label: 'Instagram', href: 'https://instagram.com/mediamap_kg', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400', icon: <InstagramIcon className="h-4 w-4" /> },
  { label: 'Facebook', href: 'https://facebook.com/mediamapkg', color: 'bg-[#1877F2]', icon: <FacebookIcon className="h-4 w-4" /> },
  { label: 'YouTube', href: 'https://youtube.com/@mediamapkg', color: 'bg-[#FF0000]', icon: <YoutubeIcon className="h-4 w-4" /> },
];

const tagStyles: Record<string, string> = {
  фактчекинг: 'bg-red-100 text-red-700',
  дезинформация: 'bg-red-100 text-red-700',
  коопсуздук: 'bg-amber-100 text-amber-800',
  безопасность: 'bg-amber-100 text-amber-800',
  обучение: 'bg-emerald-100 text-emerald-800',
  окутуу: 'bg-emerald-100 text-emerald-800',
};

const Home = () => {
  const { t } = useLanguage();

  const [activeCheckCategory, setActiveCheckCategory] = useState<{ title: string; slug: string; owl: string } | null>(null);
  const [checkInputText, setCheckInputText] = useState('');
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const [isSiteSearchOpen, setIsSiteSearchOpen] = useState(false);

  // AI Modal States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQueryText, setAiQueryText] = useState('');

  const handleAiAnalyze = async (text: string, categoryTitle?: string) => {
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
      if (data && data.analysis) {
        setAiAnalysisResult(data.analysis);
        return;
      }
    } catch (err) {
      console.warn('Backend AI route unavailable, using direct fallback:', err);
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
                content: 'Вы — официальный ИИ-ассистент платформы MediaMap (МедиаКарта), работающий на базе модели OpenAI GPT-4o mini. Ваша главная задача: помогать гражданам в выявления и правовой оценке нарушений в Кыргызстане. Отвечайте структурировано: 1. Статус проверки, 2. Категория, 3. Правовой контекст КР, 4. Рекомендованные действия.'
              },
              {
                role: 'user',
                content: `Проведи детальный анализ контента: "${text}". Категория: ${categoryTitle || 'Медиа-нарушения'}`
              }
            ]
          })
        });
        if (res.ok) {
          const resultData = await res.json();
          const aiContent = resultData.choices?.[0]?.message?.content;
          if (aiContent) {
            setAiAnalysisResult(aiContent);
            setAiLoading(false);
            return;
          }
        }
      } catch (directErr) {
        console.error('Direct OpenAI call error:', directErr);
      }
    }

    // Structured fallback analysis
    const isUrl = /^https?:\/\//i.test(text.trim());
    const fallbackReport = `### 🤖 Экспресс-анализ ИИ MediaMap (GPT-4o mini)

**Статус:** Информация в обработке модераторами  
**Категория:** ${categoryTitle || (isUrl ? 'Анализ веб-ресурса' : 'Цифровое нарушение')}  

---

#### ⚖️ Правовой контекст:
Закон КР «О средствах массовой информации» и Закон КР «О защите от недостоверной (ложной) информации».

#### 📋 Рекомендованные действия:
- Нажмите кнопку "Отправить заявку в MediaMap" ниже для публикации на карте нарушений.
- Вы также можете нажать кнопку "🔑 Ключ ИИ" внизу для подключения вашей персональной подписки OpenAI.

*(Материал передан экспертам фактчекинга)*`;

    setAiAnalysisResult(fallbackReport);
    setAiLoading(false);
  };

  const [liveNews, setLiveNews] = useState<NewsItem[]>([]);
  const [selectedDetailNews, setSelectedDetailNews] = useState<DetailedNewsItem | null>(null);

  useEffect(() => {
    axiosApi
      .get('/news')
      .then((res) => {
        const rows = res.data.rows || [];
        if (rows.length > 0) {
          const formatted: NewsItem[] = rows.map((item: any) => {
            const imgUrl = (item.source || '').split('|')[1];
            return {
              id: item.id,
              title: item.title,
              link: item.link,
              image: imgUrl || '/news1.png',
              tag: 'фактчекинг',
              date: new Date(item.pubDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
              commentsCount: Math.floor(Math.random() * 80) + 12,
              description: item.contentSnippet,
            };
          });
          setLiveNews(formatted);
        }
      })
      .catch((err) => console.error('Failed to load home news feed:', err));
  }, []);

  const fallbackNewsItems: NewsItem[] = [
    {
      id: 1,
      title: 'В Бишкеке стартовала кампания против языка вражды в соцсетях',
      link: 'https://factcheck.kg/',
      image: '/news1.png',
      tag: 'фактчекинг',
      date: '02 авг',
      commentsCount: 128,
      description: 'Правовая оценка дезинформации и разжигания розни.'
    },
    {
      id: 2,
      title: t.home.news[0]?.title || 'Цифровая безопасность журналистов: руководство по защите данных',
      link: 'https://factcheck.kg/',
      image: t.home.news[0]?.image || '/news2.png',
      tag: t.home.news[0]?.tag || 'безопасность',
      date: '01 авг',
      commentsCount: 45,
      description: 'Защита личных данных и аккаунтов от взлома.'
    },
    {
      id: 3,
      title: t.home.news[1]?.title || 'Инструкция по распознаванию фейков и манипуляций в мессенджерах',
      link: 'https://factcheck.kg/',
      image: t.home.news[1]?.image || '/news3.png',
      tag: t.home.news[1]?.tag || 'обучение',
      date: '30 июл',
      commentsCount: 89,
      description: 'Проверка недостоверных рассылок в мессенджерах.'
    },
    {
      id: 4,
      title: 'Мониторинг соблюдения стандартов свободы слова в КР',
      link: 'https://factcheck.kg/',
      image: '/news1.png',
      tag: 'исследование',
      date: '28 июл',
      commentsCount: 64,
      description: 'Экспертная аналитика от юристов медиа-сферы.'
    },
  ];

  const displayNewsList = liveNews.length > 0 ? liveNews : fallbackNewsItems;

  const homeCategories = t.home.categories.map((c, i) => ({
    ...c,
    owl: categoryOwls[i],
    slug: categorySlugs[i],
  }));

  const resources = t.home.resources.map((r, i) => ({ ...r, icon: resourceIcons[i] }));

  return (
    <div className="bg-white font-inter">

      {/* ── HERO ── */}
      <section className="bg-[#f5f0e8] py-6 lg:py-8">
        <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">

            {/* LEFT: Заголовок + Следите за нами */}
            <div className="flex flex-col justify-center">
              <EditableText
                textKey="home.heroTitle"
                value={t.home.heroTitle}
                as="h1"
                className="text-[28px] font-black leading-tight text-navy sm:text-[34px] lg:text-[38px]"
              />
              <EditableText
                textKey="home.heroSubtitle"
                value={t.home.heroSubtitle}
                as="p"
                className="mt-2.5 text-[14px] leading-relaxed text-slate-600 max-w-lg"
              />


              {/* Соцсети с фирменными иконками */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-[12px] font-bold text-navy">Следите за нами</span>
                <div className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md transition-all hover:scale-110 active:scale-95 ${s.color}`}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Горизонтальный Компактный Агрегатор Новостей */}
            <div className="w-full min-w-0">
              <NewsAggregatorCarousel
                items={displayNewsList}
                title="Агрегатор новостей"
                onSelectNews={(item) =>
                  setSelectedDetailNews({
                    id: item.id,
                    title: item.title,
                    link: item.link,
                    image: item.image,
                    tag: item.tag,
                    date: item.date,
                    description: item.description,
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* NYT Style News Detail Modal */}
      <NewsDetailModal
        news={selectedDetailNews}
        onClose={() => setSelectedDetailNews(null)}
        onRunAiCheck={(text) => handleAiAnalyze(text)}
      />

      {/* ── 3 КАТЕГОРИИ ── */}
      <section className="bg-white py-6 lg:py-8">
        <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
          <div className="mb-6 flex items-center justify-between">
            <EditableText
              textKey="home.categoriesTitle"
              value={t.home.categoriesTitle}
              as="h2"
              className="text-[22px] font-extrabold text-navy"
            />
            <Link to="/categories" className="flex items-center gap-1 text-[13px] font-bold text-red-600 hover:underline">
              {t.home.categoriesViewAll} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {homeCategories.map((c) => (
              <div
                key={c.title}
                className="group flex flex-col rounded-2xl border-2 border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-red-600/50 hover:shadow-md"
              >
                {/* Совёнок вместо иконки */}
                <div className="flex justify-center">
                  <img
                    src={c.owl.src}
                    alt={c.owl.alt}
                    className="h-32 w-32 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-[16px] font-black text-navy group-hover:text-red-600 transition-colors text-center">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600 flex-1 text-center">
                  {c.description}
                </p>
                <div className="mt-6 flex flex-col gap-2.5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCheckCategory({ title: c.title, slug: c.slug, owl: c.owl.src });
                      setCheckInputText('');
                      setCheckSubmitted(false);
                    }}
                    className="group relative flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 px-4 py-3 text-[13px] font-extrabold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-orange-500/40 active:scale-[0.98] overflow-hidden"
                  >
                    <Sparkles className="h-4 w-4 text-white animate-pulse" />
                    <span>Проверить информацию (GPT-4o mini)</span>
                  </button>

                  <Link
                    to={`/categories/${c.slug}`}
                    className="flex items-center justify-center gap-1 text-[12px] font-bold text-slate-500 hover:text-red-600 transition-colors"
                  >
                    Подробнее о категории <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── РЕСУРСЫ ── */}
      <section className="bg-[#f5f0e8]/40 py-12">
        <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
            <div className="max-w-[320px] shrink-0">
              <EditableText
                textKey="home.resourcesTitle"
                value={t.home.resourcesTitle}
                as="h2"
                className="text-[26px] font-extrabold text-navy"
              />
              <EditableText
                textKey="home.resourcesSubtitle"
                value={t.home.resourcesSubtitle}
                as="p"
                className="mt-2 text-[14px] leading-relaxed text-slateBody"
              />
              <Link
                to="/useful"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-navyCard shadow-xs"
              >
                {t.home.resourcesViewAll}
              </Link>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/map"
                className="flex items-start gap-3.5 rounded-xl bg-white p-4 border border-slate-100 shadow-2xs hover:border-red-300 hover:bg-red-50/40 transition-colors group"
              >
                <img
                  src="/main-logo.png"
                  alt="Старый сайт"
                  className="h-9 w-9 object-contain opacity-80 group-hover:opacity-100 transition-opacity shrink-0"
                />
                <div>
                  <h3 className="text-[14px] font-bold text-navy group-hover:text-red-600 transition-colors flex items-center gap-1">
                    {t.home.oldSiteTitle} <ExternalLink className="h-3 w-3" />
                  </h3>
                  <p className="mt-1 text-[12px] leading-snug text-slateBody">{t.home.oldSiteDesc}</p>
                </div>
              </Link>
              
              {resources.map((r) => (
                <div key={r.title} className="flex items-start gap-3.5 rounded-xl bg-white p-4 border border-slate-100 shadow-2xs">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100">
                    {r.icon}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-bold text-navy">{r.title}</h3>
                    <p className="mt-1 text-[12px] leading-snug text-slateBody">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── НОВОСТИ ── */}
      <section className="mx-auto max-w-[1792px] px-6 py-12 lg:px-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <EditableText
              textKey="home.newsTitle"
              value={t.home.newsTitle}
              as="h2"
              className="text-[26px] font-extrabold text-navy"
            />
            <p className="text-xs text-slate-500 mt-1">Реальные публикации и исследования в Кыргызстане</p>
          </div>
          <Link to="/useful" className="text-[13px] font-bold text-red-600 hover:underline flex items-center gap-1">
            {t.home.newsAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.home.news.map((n) => (
            <article
              key={n.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all hover:shadow-md hover:border-red-400 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-[180px] overflow-hidden bg-slate-100">
                  <img
                    src={n.image || '/news1.png'}
                    alt={n.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs ${tagStyles[n.tag] ?? 'bg-white text-navy'}`}
                  >
                    #{n.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-extrabold leading-snug text-navy group-hover:text-red-600 transition-colors">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-slateBody">{n.description}</p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100 text-[11px] text-slate-400">
                <span>{n.date}</span>
                <span className="font-bold text-navy group-hover:text-red-600 flex items-center gap-1">
                  Подробнее <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── МОДАЛЬНОЕ ОКНО ПРОВЕРКИ ИНФОРМАЦИИ ── */}
      {activeCheckCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden">
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setActiveCheckCategory(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-navy transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Заголовок с совёнком */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-50 border border-amber-100 shadow-xs">
                <img src={activeCheckCategory.owl} alt={activeCheckCategory.title} className="h-12 w-12 object-contain" />
              </div>
              <div>
                <span className="inline-block rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-bold text-amber-800 mb-1">
                  Категория: {activeCheckCategory.title}
                </span>
                <h3 className="text-[20px] font-black text-navy leading-tight">Проверить информацию</h3>
              </div>
            </div>

            {!checkSubmitted ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!checkInputText.trim()) return;
                  handleAiAnalyze(checkInputText, activeCheckCategory?.title);
                  setCheckSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  Вставьте текст, ссылку или цитату. Совёнок и эксперты MediaMap проверят достоверность по категории <strong className="text-navy font-bold">«{activeCheckCategory.title}»</strong>.
                </p>

                <textarea
                  value={checkInputText}
                  onChange={(e) => setCheckInputText(e.target.value)}
                  placeholder="Вставьте ссылку или текст для проверки..."
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-[14px] text-navy outline-none transition-colors focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200 shadow-inner resize-none"
                />

                <div className="flex items-center gap-3 pt-2">
                  <button 
                    type="submit" 
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-[14px] font-bold text-white shadow-md transition-all hover:bg-red-700 hover:scale-[1.02]"
                  >
                    <Sparkles className="h-4 w-4" /> Отправить на проверку
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setActiveCheckCategory(null)}
                    className="rounded-xl border border-slate-200 px-5 py-3.5 text-[14px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-4 gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-1">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h4 className="text-[18px] font-extrabold text-navy">Запрос успешно отправлен!</h4>
                <p className="text-[13px] text-slate-600 max-w-md">
                  Спасибо! Материал передан на проверку фактчекерам по категории «{activeCheckCategory.title}».
                </p>
                <div className="flex gap-3 mt-4 w-full">
                  <Link 
                    to="/new-report"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-[13px] font-bold text-white hover:bg-navyCard transition-colors"
                  >
                    Сообщить о нарушении на карте
                  </Link>
                  <button 
                    onClick={() => setActiveCheckCategory(null)}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── AI ANALYSIS RESULT MODAL ── */}
      <AiAnalysisModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        analysisText={aiAnalysisResult}
        loading={aiLoading}
        queryText={aiQueryText}
      />

      {/* ── SITE SEARCH MODAL ── */}
      <SiteSearchModal
        isOpen={isSiteSearchOpen}
        onClose={() => setIsSiteSearchOpen(false)}
      />

    </div>
  );
};

export default Home;
