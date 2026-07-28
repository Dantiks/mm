import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  MessageSquareWarning, 
  FileSearch, 
  ShieldAlert, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';

const categoryData = [
  {
    id: 'hate-speech',
    icon: <MessageSquareWarning className="h-8 w-8 text-red-600" />,
    badge: 'Категория №1',
  },
  {
    id: 'disinformation',
    icon: <FileSearch className="h-8 w-8 text-red-600" />,
    badge: 'Категория №2',
  },
  {
    id: 'digital-fraud',
    icon: <ShieldAlert className="h-8 w-8 text-red-600" />,
    badge: 'Категория №3',
  },
];

const Categories = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white font-inter min-h-screen py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        
        {/* Крупный заголовок: Визуально очевидно, что категорий три */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/owl-mascot.png" 
              alt="Mascot" 
              className="h-16 w-16 object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-black text-red-700 uppercase tracking-widest mb-3 border border-red-200 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-red-600" />
            3 Основные категории нарушений
          </div>
          <h1 className="text-3xl font-black text-navy sm:text-4xl md:text-5xl tracking-tight">
            Категории нарушений
          </h1>
        </div>

        {/* СРАЗУ ПОСЛЕ КРУПНОГО ЗАГОЛОВКА ИДУТ САМИ 3 КАТЕГОРИИ (БЕЗ ПРОМЕЖУТОЧНОГО ТЕКСТА И БЕЗ ЦИТАТ) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categoryData.map((cat) => {
            const detail = t.categoryDetails[cat.id];
            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className="group relative flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl"
              >
                <div>
                  {/* Верхняя часть карточки с фирменной красной иконкой */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 border-2 border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                      {cat.icon}
                    </span>
                    <span className="rounded-full bg-red-50 px-3.5 py-1 text-xs font-extrabold text-red-700 border border-red-100 uppercase tracking-wider">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Название и описание категории */}
                  <h2 className="text-2xl font-black text-navy group-hover:text-red-600 transition-colors">
                    {detail.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
                    {detail.summary}
                  </p>
                </div>

                {/* Нижняя кнопка-ссылка на детальную страницу с законами и примерами */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-navy group-hover:text-red-600 transition-colors">
                  <span>Что это, законы КР и примеры</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform text-red-600" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Информационный блок с Маскотом-совёнком */}
        <div className="mt-12 rounded-3xl border-2 border-amber-200/80 bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-amber-50/80 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="relative shrink-0">
            <img
              src="/owl-mascot.png"
              alt={t.owl.teacherName}
              className="h-20 w-20 object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-navy mb-1 flex items-center gap-2">
              <span>{t.owl.explainHeader}</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              Все три категории строго мониторятся экспертами MediaMap. Кликните по любой карточке выше, чтобы изучить подробную юридическую базу Кыргызской Республики, статьи Уголовного Кодекса и реальные примеры из практики.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;

