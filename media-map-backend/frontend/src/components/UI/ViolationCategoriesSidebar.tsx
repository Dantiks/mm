import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, BookOpen } from 'lucide-react';
import EditableText from '../CMS/EditableText';
import EditableImage from '../../components/CMS/EditableImage';

export const ViolationCategoriesSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const categories = [
    {
      id: 1,
      slug: 'hate-speech',
      title: 'Язык вражды',
      desc: 'Дискриминационные высказывания, враждебные призывы и ксенофобия в медиа.',
      owl: '/owl-stop.png',
      bg: 'bg-red-50 border-red-100',
    },
    {
      id: 2,
      slug: 'disinformation',
      title: 'Дезинформация',
      desc: 'Манипуляция фактами, фальсифицированные видео и ложные новости.',
      owl: '/owl-think.png',
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      id: 3,
      slug: 'digital-scams',
      title: 'Цифровое мошенничество',
      desc: 'Фишинг, взлом аккаунтов, дипфейки и финансовые схемы в сети.',
      owl: '/owl-teacher.png',
      bg: 'bg-blue-50 border-blue-100',
    },
  ];

  return (
    <>
      {/* Sticky Quick Toggle Tab on Left Screen Edge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 bg-navy text-white px-2.5 py-3 rounded-r-2xl shadow-2xl hover:bg-red-600 transition-all hover:pl-3.5 cursor-pointer group border border-l-0 border-white/20"
        title="Категории нарушений"
      >
        <EditableImage imageKey="images.owlThink" fallbackSrc="/owl-think.png" alt="Совёнок" className="h-7 w-7 object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-xs font-black uppercase tracking-wider hidden sm:block">
          <EditableText textKey="sidebar.toggleBtn" value="Категории нарушений" />
        </span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] bg-slate-950/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-[1100] w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <EditableImage imageKey="images.owlMascotSidebar" fallbackSrc="/owl-mascot.png" alt="Совёнок" className="h-9 w-9 object-contain drop-shadow-xs" />
            <div>
              <h3 className="font-extrabold text-navy text-base"><EditableText textKey="sidebar.drawer.title" value="Категории нарушений" /></h3>
              <p className="text-xs text-slate-500"><EditableText textKey="sidebar.drawer.subtitle" value="Правовой навигатор MediaMap" /></p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {categories.map((c) => {
            const isActive = location.pathname.includes(c.slug);
            return (
              <Link
                key={c.id}
                to={`/categories/${c.slug}`}
                onClick={() => setIsOpen(false)}
                className={`block rounded-2xl border p-4 transition-all hover:shadow-md ${
                  isActive
                    ? 'border-red-500 bg-red-50/30 shadow-xs'
                    : 'border-slate-200/80 bg-white hover:border-red-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`h-14 w-14 shrink-0 rounded-2xl p-1 border flex items-center justify-center ${c.bg}`}>
                    <img src={c.owl} alt={c.title} className="h-full w-full object-contain drop-shadow-md transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-navy">
                      <EditableText textKey={`sidebar.cat.${c.id}.title`} value={c.title} />
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      <EditableText textKey={`sidebar.cat.${c.id}.desc`} value={c.desc} />
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 py-1.5 px-3 rounded-xl bg-red-600 text-white text-[11px] font-extrabold shadow-xs">
                        <EditableText textKey={`sidebar.cat.${c.id}.btnCheck`} value="Проверить информацию" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Link */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <Link
            to="/categories"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-navy text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
          >
            <BookOpen className="h-4 w-4" />
            <EditableText textKey="sidebar.btnAllCategories" value="Все категории и законы КР" />
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </>
  );
};

export default ViolationCategoriesSidebar;
