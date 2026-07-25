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
} from 'lucide-react';

const socials = [
  { label: 'TG', href: 'https://t.me/' },
  { label: 'IG', href: 'https://instagram.com/' },
  { label: 'FB', href: 'https://facebook.com/' },
  { label: 'YT', href: 'https://youtube.com/' },
];

const homeCategories = [
  {
    icon: <Hexagon className="h-5 w-5" />,
    title: 'Язык вражды',
    description:
      'Понимаем, как распознавать язык вражды и почему важно не распространять ненависть.',
  },
  {
    icon: <AlignJustify className="h-5 w-5" />,
    title: 'Дезинформация',
    description: 'Учимся выявлять фейки, манипуляции и пропаганду в новостях и соцсетях.',
  },
  {
    icon: <ShieldAlert className="h-5 w-5" />,
    title: 'Цифровое мошенничество',
    description: 'Защищаем личные данные, распознаём схемы обмана и фишинга.',
  },
];

const resources = [
  {
    icon: <Compass className="h-4 w-4" />,
    title: 'Медиаграмотность',
    description: 'Развиваем критическое мышление и навыки ответственного потребления.',
  },
  {
    icon: <CheckSquare className="h-4 w-4" />,
    title: 'Чек-листы',
    description: 'Простые списки для проверки информации.',
  },
  {
    icon: <PlayCircle className="h-4 w-4" />,
    title: 'Видео и подкасты',
    description: 'Объясняем сложные темы простыми словами.',
  },
  {
    icon: <FileText className="h-4 w-4" />,
    title: 'Статьи и гайды',
    description: 'Подробные материалы и инструкции.',
  },
  {
    icon: <Wrench className="h-4 w-4" />,
    title: 'Инструменты',
    description: 'Полезные сервисы для проверки фактов.',
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: 'Тесты и квизы',
    description: 'Проверьте свои знания в интерактивном формате.',
  },
];

const news = [
  {
    tag: 'дезинформация',
    title: 'Минюст обновил разъяснения к закону о защите от ложной информации',
    description:
      'Новые критерии помогут отличать журналистскую ошибку от преднамеренной дезинформации.',
    date: '2 июля 2026',
  },
  {
    tag: 'инструменты',
    title: 'MediaMap запускает Telegram-бот для быстрой проверки новостей',
    description:
      'Бот проверяет ссылки и скриншоты за секунды и объясняет вердикт простыми словами.',
    date: '28 июня 2026',
  },
  {
    tag: 'языквражды',
    title: 'Исследование: язык вражды в комментариях вырос на 12% за полугодие',
    description: 'Больше всего рост заметен в комментариях к темам миграции и религии.',
    date: '21 июня 2026',
  },
];

const tagStyles: Record<string, string> = {
  дезинформация: 'bg-[#fbe4e1] text-[#b3392f]',
  языквражды: 'bg-[#fbe4e1] text-[#b3392f]',
  инструменты: 'bg-creamPill text-goldDeep',
};

const CheckMessageControl = () => (
  <form
    onSubmit={(e) => e.preventDefault()}
    className="flex h-[44px] w-full overflow-hidden rounded-[8px] border border-lineLight"
  >
    <input
      type="text"
      placeholder="Проверить сообщение"
      className="min-w-0 flex-1 bg-white px-[14px] text-[14px] text-navy placeholder:text-[#757575] outline-none"
    />
    <button
      type="submit"
      aria-label="Проверить сообщение"
      className="flex w-[44px] shrink-0 items-center justify-center bg-navy text-[16px] text-white"
    >
      ▶
    </button>
  </form>
);

const Home = () => {
  return (
    <div className="bg-white font-inter">
      {/* Hero */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[1792px] px-6 py-14 lg:px-16">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-[620px]">
              <h1 className="text-[34px] font-extrabold leading-tight text-navy md:text-[46px]">
                Медиаграмотность — ваш навигатор в мире информации
              </h1>
              <p className="mt-4 text-[17px] leading-[27.2px] text-[#4b5556]">
                Учимся анализировать информацию, распознавать манипуляции, противостоять языку
                вражды, дезинформации и цифровому мошенничеству.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-[13px] font-semibold text-navy">Следите за нами</span>
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
              <div className="overflow-hidden rounded-[10px] border border-lineLight bg-white">
                <div className="flex h-[220px] items-center justify-center bg-creamPill">
                  <span className="font-mono text-[10px] uppercase tracking-[0.29px] text-[#9aa3a4]">
                    фото: новость дня
                  </span>
                </div>
                <p className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.29px] text-[#9aa3a4]">
                  Новость дня · обновляется автоматически
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-[10px] border border-lineLight bg-white p-4">
                <img
                  src="/owl-mascot.png"
                  alt=""
                  className="h-[44px] w-[52px] shrink-0 object-contain"
                />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.32px] text-goldDeep">
                    Цитата дня
                  </p>
                  <p className="mt-1 text-[13px] italic leading-snug text-[#2e3839]">
                    «Анализ современных медиа-трендов требует мультидисциплинарного подхода для
                    подлинного понимания их влияния.»
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
                  <span className="block text-[13px] font-bold text-ink">Старый сайт</span>
                  <span className="block text-[12px] text-slateBody">
                    Доступ к предыдущей версии платформы
                  </span>
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
                <CheckMessageControl />
              </div>
              <Link
                to="/categories"
                className="mt-3 text-[13px] font-semibold text-navy hover:underline"
              >
                Проверить информацию →
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
              <h2 className="text-[28px] font-extrabold text-navy">Ресурсы для вас</h2>
              <p className="mt-3 text-[14px] leading-[22.4px] text-slateBody">
                Практические материалы, инструменты и сервисы для работы с информацией.
              </p>
              <Link
                to="/useful"
                className="mt-4 inline-block text-[13px] font-semibold text-navy hover:underline"
              >
                Смотреть все ресурсы →
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
          <h2 className="text-[28px] font-extrabold text-navy">Новости</h2>
          <span className="text-[13px] font-semibold text-slateBody">Все новости →</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((n) => (
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
          Читать все новости →
        </span>
      </div>
    </div>
  );
};

export default Home;
