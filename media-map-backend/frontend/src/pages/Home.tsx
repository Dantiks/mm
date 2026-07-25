import React from 'react';
import { Link } from 'react-router-dom';
import {
  Hexagon,
  AlignJustify,
  ShieldAlert,
  Compass,
  CheckSquare,
  PlayCircle,
  FileText,
  Wrench,
  Sparkles,
  Fuel,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const socials = [
  { label: 'TG', href: 'https://t.me/' },
  { label: 'IG', href: 'https://instagram.com/' },
  { label: 'FB', href: 'https://facebook.com/' },
  { label: 'YT', href: 'https://youtube.com/' },
];

const categoryIcons = [
  <Hexagon className="h-5 w-5" key="hexagon" />,
  <AlignJustify className="h-5 w-5" key="align" />,
  <ShieldAlert className="h-5 w-5" key="shield" />,
];

const resourceIcons = [
  <Compass className="h-4 w-4" key="compass" />,
  <CheckSquare className="h-4 w-4" key="check" />,
  <PlayCircle className="h-4 w-4" key="play" />,
  <FileText className="h-4 w-4" key="file" />,
  <Wrench className="h-4 w-4" key="wrench" />,
  <Sparkles className="h-4 w-4" key="sparkles" />,
];

const NEWS_OF_DAY_SOURCE =
  'https://gazeta.kg/economika/209237-pervaja-partija-gsm-iz-kitaja-otpravlena-v-kyrgyzstan.html';

const tagStyles: Record<string, string> = {
  дезинформация: 'bg-[#fbe4e1] text-[#b3392f]',
  языквражды: 'bg-[#fbe4e1] text-[#b3392f]',
  инструменты: 'bg-creamPill text-goldDeep',
};

const CheckMessageControl: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <form
    onSubmit={(e) => e.preventDefault()}
    className="flex h-[44px] w-full overflow-hidden rounded-[8px] border border-lineLight"
  >
    <input
      type="text"
      placeholder={placeholder}
      className="min-w-0 flex-1 bg-white px-[14px] text-[14px] text-navy placeholder:text-[#757575] outline-none"
    />
    <button
      type="submit"
      aria-label={placeholder}
      className="flex w-[44px] shrink-0 items-center justify-center bg-navy text-[16px] text-white"
    >
      ▶
    </button>
  </form>
);

const Home = () => {
  const { t } = useLanguage();
  const homeCategories = t.home.categories.map((c, i) => ({ ...c, icon: categoryIcons[i] }));
  const resources = t.home.resources.map((r, i) => ({ ...r, icon: resourceIcons[i] }));

  return (
    <div className="bg-white font-inter">
      {/* Hero */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[1792px] px-6 py-14 lg:px-16">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-[620px]">
              <h1 className="text-[34px] font-extrabold leading-tight text-navy md:text-[46px]">
                {t.home.heroTitle}
              </h1>
              <p className="mt-4 text-[17px] leading-[27.2px] text-[#4b5556]">
                {t.home.heroSubtitle}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-[13px] font-semibold text-navy">{t.home.followUs}</span>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-mono text-[9px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex w-full flex-col gap-3 xl:max-w-[820px]">
              <a
                href={NEWS_OF_DAY_SOURCE}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-[10px] border border-lineLight bg-white transition-colors hover:bg-cream"
              >
                <div className="flex h-[220px] items-center justify-center bg-creamPill">
                  <Fuel className="h-10 w-10 text-goldDeep" strokeWidth={1.5} />
                </div>
                <p className="px-4 pt-3 font-mono text-[10px] uppercase tracking-[0.29px] text-[#9aa3a4]">
                  {t.home.newsOfDayCaption}
                </p>
                <p className="px-4 pb-4 pt-1 text-[15px] font-bold leading-snug text-navy underline decoration-navy/40 underline-offset-2">
                  {t.home.newsOfDayTitle}
                </p>
              </a>

              <div className="flex items-center gap-3 rounded-[10px] border border-lineLight bg-white p-4">
                <img
                  src="/owl-mascot.png"
                  alt=""
                  className="h-[44px] w-[52px] shrink-0 object-contain"
                />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.32px] text-goldDeep">
                    {t.home.quoteLabel}
                  </p>
                  <p className="mt-1 text-[13px] italic leading-snug text-[#2e3839]">
                    {t.home.quoteText}
                  </p>
                </div>
              </div>

              <Link
                to="/"
                className="flex items-center gap-3 rounded-[10px] border border-lineLight bg-white p-4 transition-colors hover:bg-cream"
              >
                <img
                  src="/main-logo.png"
                  alt="mediamap.kg"
                  className="h-[36px] w-[36px] shrink-0 object-contain"
                />
                <span>
                  <span className="block text-[13px] font-bold text-ink">{t.home.oldSite}</span>
                  <span className="block text-[12px] text-slateBody">{t.home.oldSiteDesc}</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category teasers */}
      <div className="mx-auto max-w-[1792px] px-6 py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {homeCategories.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-[16px] border border-lineLight bg-white p-6"
            >
              <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-creamPill text-navy">
                {c.icon}
              </span>
              <h2 className="mt-4 text-[19px] font-extrabold text-ink">{c.title}</h2>
              <p className="mt-2 flex-1 text-[14px] leading-[22.4px] text-slateBody">
                {c.description}
              </p>
              <div className="mt-5">
                <CheckMessageControl placeholder={t.home.checkMessagePlaceholder} />
              </div>
              <Link
                to="/categories"
                className="mt-3 text-[13px] font-semibold text-navy hover:underline"
              >
                {t.home.checkInfo}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[1792px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-[320px] shrink-0">
              <h2 className="text-[28px] font-extrabold text-navy">{t.home.resourcesTitle}</h2>
              <p className="mt-3 text-[14px] leading-[22.4px] text-slateBody">
                {t.home.resourcesSubtitle}
              </p>
              <Link
                to="/useful"
                className="mt-4 inline-block text-[13px] font-semibold text-navy hover:underline"
              >
                {t.home.resourcesViewAll}
              </Link>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((r) => (
                <div key={r.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    {r.icon}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-navy">{r.title}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-slateBody">
                      {r.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News */}
      <div className="mx-auto max-w-[1792px] px-6 py-16 lg:px-16">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-extrabold text-navy">{t.home.newsTitle}</h2>
          <span className="text-[13px] font-semibold text-slateBody">{t.home.newsAll}</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.home.news.map((n) => (
            <div
              key={n.title}
              className="overflow-hidden rounded-[16px] border border-lineLight bg-white"
            >
              <div className="flex h-[180px] items-center justify-center bg-creamPill">
                <span className="font-mono text-[10px] uppercase tracking-[0.29px] text-[#9aa3a4]">
                  фото: новость
                </span>
              </div>
              <div className="p-5">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${tagStyles[n.tag] ?? 'bg-creamPill text-goldDeep'}`}
                >
                  #{n.tag}
                </span>
                <h3 className="mt-3 text-[16px] font-extrabold leading-snug text-ink">
                  {n.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slateBody">
                  {n.description}
                </p>
                <p className="mt-3 text-[12px] text-[#9aa3a4]">{n.date}</p>
              </div>
            </div>
          ))}
        </div>

        <span className="mt-6 inline-block text-[13px] font-semibold text-slateBody">
          {t.home.newsReadAll}
        </span>
      </div>
    </div>
  );
};

export default Home;
