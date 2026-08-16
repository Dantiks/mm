import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, BookOpen } from 'lucide-react';
import EditableText from '../CMS/EditableText';
import { useLanguage } from '../../i18n/LanguageContext';

export const ViolationCategoriesSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Slug/artwork stay here; the copy comes from the translations so the
  // sidebar follows the selected language instead of being Russian-only.
  const categories = [
    { id: 1, slug: 'hate-speech', owl: '/owl-stop.png', bg: 'bg-slate-50 border-slate-200' },
    { id: 2, slug: 'disinformation', owl: '/owl-think.png', bg: 'bg-slate-50 border-slate-200' },
    { id: 3, slug: 'digital-scams', owl: '/owl-teacher.png', bg: 'bg-blue-50 border-blue-100' },
  ].map((meta, i) => ({
    ...meta,
    title: t.home.categories[i]?.title ?? '',
    desc: t.home.categories[i]?.description ?? '',
  }));

  return (
    <>
      {/* Sticky Quick Toggle Tab on Left Screen Edge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 bg-navy text-white px-2.5 py-3 rounded-r-2xl shadow-2xl hover:bg-navyCard transition-all hover:pl-3.5 cursor-pointer group border border-l-0 border-white/20"
        title={t.home.categoriesTitle}
      >
        <img src="/owl-think.png" alt="Совёнок" className="h-7 w-7 object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-xs font-black uppercase tracking-wider hidden sm:block">
          <EditableText textKey="sidebar.toggleBtn" value={t.home.categoriesTitle} />
        </span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <img src="/owl-mascot.png" alt="Совёнок" className="h-9 w-9 object-contain drop-shadow-xs" />
            <div>
              <h3 className="font-extrabold text-navy text-base"><EditableText textKey="sidebar.drawer.title" value={t.home.categoriesTitle} /></h3>
              <p className="text-xs text-slate-500"><EditableText textKey="sidebar.drawer.subtitle" value={t.home.legalNavigator} /></p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 hover:bg-navyCard hover:text-white transition-all cursor-pointer"
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
                    ? 'border-navy bg-slate-50 shadow-xs'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`h-14 w-14 shrink-0 rounded-2xl p-1 border flex items-center justify-center ${c.bg}`}>
                    <img src={c.owl} alt={c.title} className="h-full w-full object-contain drop-shadow-md transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-navy hover:text-navy transition-colors">
                      <EditableText textKey={`sidebar.cat.${c.id}.title`} value={c.title} />
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      <EditableText textKey={`sidebar.cat.${c.id}.desc`} value={c.desc} />
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 py-1.5 px-3 rounded-xl bg-navy hover:bg-navyCard text-white text-[11px] font-extrabold shadow-xs transition-all">
                        <EditableText textKey={`sidebar.cat.${c.id}.btnCheck`} value={t.home.checkInfoBtn} />
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
            <EditableText textKey="sidebar.btnAllCategories" value={t.home.allCategoriesBtn} />
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </>
  );
};

export default ViolationCategoriesSidebar;
