import React from 'react';
import { Link } from 'react-router-dom';

interface Stat {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

interface Category {
  icon: string;
  title: string;
  count: string;
  description: string;
  example?: string;
  stats: Stat[];
}

const categories: Category[] = [
  {
    icon: '⬡',
    title: 'Язык вражды',
    count: '1,248 постов за неделю',
    description:
      'Язык вражды — это высказывания, унижающие или дискриминирующие людей по признаку пола, этничности, религии или ориентации. Мы показываем, как его распознавать и почему важно ему не потворствовать.',
    example:
      'Пример кейса: публикации с признаками этнической вражды в отношении мигрантских сообществ, содержащие дезинформацию и призывы к дискриминации.',
    stats: [
      { label: 'Гендер · неделя', value: '432', delta: '4.2%', up: true },
      { label: 'ЛГБТ · неделя', value: '315', delta: '1.8%', up: false },
      { label: 'Этничность · неделя', value: '501', delta: '8.1%', up: true },
    ],
  },
  {
    icon: '▤',
    title: 'Дезинформация',
    count: '850 постов за неделю',
    description:
      'Дезинформация — это заведомо ложная или искажённая информация, которую распространяют, чтобы ввести в заблуждение или повлиять на общественное мнение.',
    stats: [
      { label: 'Фейковые новости · неделя', value: '320', delta: '6.4%', up: true },
      { label: 'Синтетические видео · неделя', value: '140', delta: '11.3%', up: true },
      { label: 'Боты-аккаунты · неделя', value: '390', delta: '2.6%', up: false },
    ],
  },
  {
    icon: '🛡',
    title: 'Цифровое мошенничество',
    count: '420 постов за неделю',
    description:
      'Цифровое мошенничество — это обман с использованием технологий: фишинг, поддельные сайты и схемы для кражи денег или личных данных. Мы отслеживаем схемы фишинга, поддельные банковские уведомления и мошеннические предложения работы, распространяемые в мессенджерах и соцсетях.',
    stats: [
      { label: 'Фишинговые ссылки · неделя', value: '210', delta: '9.7%', up: true },
      { label: 'Поддельные банк. уведомления · неделя', value: '95', delta: '3.1%', up: true },
      { label: 'Мошеннические вакансии · неделя', value: '115', delta: '4.5%', up: false },
    ],
  },
];

const CheckMessageControl = () => (
  <form
    onSubmit={(e) => e.preventDefault()}
    className="flex h-[44px] w-full max-w-[292px] shrink-0 overflow-hidden rounded-[8px] border border-lineLight"
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

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => (
  <div className="rounded-[12px] border border-lineLight px-[18px] py-[14px]">
    <p className="text-[12px] font-normal uppercase tracking-[0.48px] text-[#9aa3a4]">
      {stat.label}
    </p>
    <div className="mt-3 flex items-baseline gap-2">
      <span className="text-[26px] font-extrabold leading-none text-ink">{stat.value}</span>
      <span
        className={`text-[13px] font-semibold ${stat.up ? 'text-statUp' : 'text-statDown'}`}
      >
        {stat.up ? '↑' : '↓'} {stat.delta}
      </span>
    </div>
  </div>
);

const CategorySection: React.FC<{ category: Category }> = ({ category }) => (
  <section className="border-t border-lineLight pt-12 first:border-t-0 first:pt-0">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-creamPill text-[20px] text-navy">
          {category.icon}
        </span>
        <div>
          <h2 className="text-[22px] font-extrabold leading-tight text-ink">{category.title}</h2>
          <p className="mt-1 text-[13px] text-[#9aa3a4]">{category.count}</p>
        </div>
      </div>
      <CheckMessageControl />
    </div>

    <p className="mt-6 max-w-[820px] text-[14px] leading-[22.4px] text-slateBody">
      {category.description}
    </p>

    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {category.stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>

    {category.example && (
      <div className="mt-6 flex max-w-[1100px] items-start gap-4 rounded-[12px] border border-lineLight bg-cream/50 p-4">
        <img
          src="/owl-mascot.png"
          alt=""
          className="h-[40px] w-[48px] shrink-0 object-contain"
        />
        <p className="text-[14px] leading-[22.4px] text-slateBody">{category.example}</p>
      </div>
    )}
  </section>
);

interface CategoriesProps {
  /** When rendered as the home route, hide the self-referential breadcrumb. */
  isHome?: boolean;
}

const Categories: React.FC<CategoriesProps> = ({ isHome = false }) => {
  return (
    <div className="bg-white font-inter">
      {/* Breadcrumb bar */}
      {!isHome && (
        <div className="border-b border-lineLight bg-cream">
          <div className="mx-auto max-w-[1792px] px-6 py-[11px] lg:px-16">
            <Link to="/" className="text-[13px] font-semibold text-navy hover:underline">
              ← Главная
            </Link>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[1792px] px-6 py-14 lg:px-16">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-[620px]">
              <h1 className="text-[34px] font-extrabold leading-tight text-navy md:text-[44px]">
                Категории нарушений
              </h1>
              <p className="mt-4 text-[17px] leading-[27.2px] text-[#4b5556]">
                Три направления, которые мы отслеживаем и объясняем: язык вражды, дезинформация и
                цифровое мошенничество.
              </p>
            </div>

            {/* Aside */}
            <aside className="hidden w-[300px] shrink-0 flex-col gap-3 xl:flex">
              <div className="flex items-center gap-3 rounded-[10px] border border-lineLight bg-white p-3">
                <img
                  src="/owl-mascot.png"
                  alt=""
                  className="h-[44px] w-[52px] shrink-0 object-contain"
                />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.32px] text-goldDeep">
                    Цитата дня
                  </p>
                  <p className="mt-1 text-[12px] italic leading-snug text-[#2e3839]">
                    «Анализ современных медиа-трендов требует мультидисциплинарного подхода для
                    подлинного понимания их влияния.»
                  </p>
                </div>
              </div>

              <Link
                to="/"
                className="flex items-center gap-3 rounded-[10px] border border-lineLight bg-white p-3 transition-colors hover:bg-cream"
              >
                <img
                  src="/main-logo.png"
                  alt="mediamap.kg"
                  className="h-[36px] w-[36px] shrink-0 object-contain"
                />
                <span>
                  <span className="block text-[13px] font-bold text-ink">Старый сайт</span>
                  <span className="block text-[11px] text-slateBody">
                    Доступ к предыдущей версии платформы
                  </span>
                </span>
              </Link>
            </aside>
          </div>
        </div>
      </div>

      {/* Category sections */}
      <div className="mx-auto max-w-[1792px] px-6 py-16 lg:px-16">
        <div className="space-y-12">
          {categories.map((category) => (
            <CategorySection key={category.title} category={category} />
          ))}
        </div>

        {/* Quote of the day callout */}
        <div className="mt-12 flex items-center gap-5 rounded-[16px] border border-lineLight bg-cream p-5">
          <img
            src="/owl-mascot.png"
            alt=""
            className="h-[54px] w-[72px] shrink-0 object-contain"
          />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.55px] text-goldDeep">
              Цитата дня
            </p>
            <p className="mt-1 text-[14px] italic leading-[22.4px] text-[#2e3839]">
              «Анализ современных медиа-трендов требует мультидисциплинарного подхода для подлинного
              понимания их влияния.»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
