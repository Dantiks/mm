import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  CheckSquare,
  PlayCircle,
  FileText,
  Wrench,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

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
  { label: 'TG', href: 'https://t.me/mediamap_kg', color: 'bg-[#229ED9]' },
  { label: 'IG', href: 'https://instagram.com/mediamap_kg', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
  { label: 'FB', href: 'https://facebook.com/mediamapkg', color: 'bg-[#1877F2]' },
  { label: 'YT', href: 'https://youtube.com/@mediamapkg', color: 'bg-[#FF0000]' },
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

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const carouselNews = [
    { title: t.home.newsOfDayTitle, link: 'https://factcheck.kg/' },
    { title: t.home.news[0]?.title || 'Важная новость', link: 'https://factcheck.kg/' },
    { title: t.home.news[1]?.title || 'Обновление платформы', link: 'https://factcheck.kg/' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % carouselNews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselNews.length]);

  const homeCategories = t.home.categories.map((c, i) => ({
    ...c,
    owl: categoryOwls[i],
    slug: categorySlugs[i],
  }));

  const resources = t.home.resources.map((r, i) => ({ ...r, icon: resourceIcons[i] }));

  return (
    <div className="bg-white font-inter">

      {/* ── HERO ── */}
      <section className="bg-[#f5f0e8] py-12 lg:py-16">
        <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">

            {/* LEFT: Заголовок + Следите за нами */}
            <div className="flex flex-col justify-center">
              <h1 className="text-[32px] font-black leading-tight text-navy sm:text-[40px] lg:text-[46px]">
                {t.home.heroTitle}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 max-w-lg">
                {t.home.heroSubtitle}
              </p>

              {/* Соцсети */}
              <div className="mt-8 flex items-center gap-3">
                <span className="text-[13px] font-bold text-navy">Следите за нами</span>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black text-white shadow-sm transition-transform hover:scale-110 ${s.color}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: Агрегатор-виджет */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-1 shadow-sm border border-slate-100">

              {/* Новость дня (Карусель) */}
              <a
                href={carouselNews[currentNewsIndex].link}
                target="_blank"
                rel="noreferrer"
                className="relative flex flex-col gap-1 rounded-xl bg-[#f5f0e8] p-4 transition-colors hover:bg-amber-100/60 min-h-[96px] overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800">
                    {t.home.newsOfDayCaption}
                  </span>
                </div>
                <div className="relative flex-1">
                  {carouselNews.map((news, idx) => (
                    <div 
                      key={idx}
                      className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${idx === currentNewsIndex ? 'opacity-100 relative' : 'opacity-0 absolute pointer-events-none'}`}
                    >
                      <p className="text-[14px] font-bold text-red-700 underline underline-offset-2 decoration-red-400 leading-snug line-clamp-2">
                        {news.title}
                      </p>
                    </div>
                  ))}
                </div>
              </a>

              {/* Цитата дня */}
              <div className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 border border-slate-100">
                <img
                  src="/owl-mascot.png"
                  alt="Совёнок"
                  className="h-10 w-10 shrink-0 object-contain"
                />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Цитата дня
                  </p>
                  <p className="text-[13px] italic leading-snug text-navy">
                    «{t.home.quoteOfDay ?? 'Анализ современных медиа-трендов требует мультидисциплинарного подхода для подлинного понимания их влияния.'}»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── БЛОК ПРОВЕРКИ ИНФОРМАЦИИ ── */}
      <section className="bg-white pt-10 pb-2">
        <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
          <div className="flex flex-col gap-5 rounded-2xl bg-[#f5f0e8]/60 p-6 border border-amber-100/50 shadow-sm md:flex-row md:items-center md:justify-between relative overflow-hidden">
            {/* Декоративный фон */}
            <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
              <Sparkles className="h-48 w-48 text-amber-500" />
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-amber-100">
                <img src="/owl-mascot.png" alt="Совёнок" className="h-8 w-8 object-contain" />
              </div>
              <div>
                <h2 className="text-[18px] font-black text-navy">{t.home.checkInfoBtn}</h2>
                <p className="text-[13px] text-slate-600 mt-1 max-w-md">{t.owl.checkTip}</p>
              </div>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Функция проверки информации в разработке');
              }}
              className="flex w-full max-w-xl gap-2 relative z-10"
            >
              <input 
                type="text" 
                placeholder={t.home.checkInputPlaceholder} 
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
              />
              <button type="submit" className="flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition-all hover:bg-red-700 hover:scale-105 shadow-sm">
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── 3 КАТЕГОРИИ ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[22px] font-extrabold text-navy">{t.home.categoriesTitle}</h2>
            <Link to="/categories" className="flex items-center gap-1 text-[13px] font-bold text-red-600 hover:underline">
              {t.home.categoriesViewAll} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {homeCategories.map((c) => (
              <Link
                key={c.title}
                to={`/categories/${c.slug}`}
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
                <span className="mt-4 flex items-center justify-center gap-1 text-[12px] font-bold text-red-600">
                  Подробнее <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── РЕСУРСЫ ── */}
      <section className="bg-[#f5f0e8]/40 py-12">
        <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
            <div className="max-w-[320px] shrink-0">
              <h2 className="text-[26px] font-extrabold text-navy">{t.home.resourcesTitle}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slateBody">
                {t.home.resourcesSubtitle}
              </p>
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
            <h2 className="text-[26px] font-extrabold text-navy">{t.home.newsTitle}</h2>
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

    </div>
  );
};

export default Home;
