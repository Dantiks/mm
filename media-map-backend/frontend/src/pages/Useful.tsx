import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import usefulContent from '../i18n/pages/useful';
import { USEFUL_RESOURCE_ICONS } from '../utils/usefulData';
import { ExternalLink, BookOpen } from 'lucide-react';

const Useful: React.FC = () => {
  const { language } = useLanguage();
  const c = usefulContent[language];

  return (
    <div className="bg-[#FAF9F5] min-h-screen font-inter">
      {/* Editorial Page Banner (Same as News.tsx) */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <span className="font-mono text-xs font-black uppercase tracking-widest text-red-600">
                {c.eyebrow} • Media Library
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
              {c.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-serif max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Editorial Feed Layout (NYTimes Style like News.tsx) */}
      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="divide-y divide-slate-200/90">
            {c.resources.map((res) => (
              <article
                key={res.id}
                className="py-8 group cursor-pointer transition-colors hover:bg-slate-100/50 p-4 rounded-2xl"
                onClick={() => {
                  if (res.link && res.link !== '#') {
                    window.open(res.link, '_blank');
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN: Tag Badge (NYT Style) */}
                  <div className="md:col-span-2 pt-1">
                    <span className="inline-block rounded-full bg-red-50 text-red-700 border border-red-100 px-3 py-1 font-mono text-[11px] font-extrabold uppercase">
                      #{res.tag}
                    </span>
                  </div>

                  {/* CENTER COLUMN: Title, Description, Actions */}
                  <div className="md:col-span-7 space-y-2">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug flex items-center gap-2">
                      <span>{res.title}</span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-600" />
                    </h2>

                    <p className="text-sm font-serif text-slate-600 leading-relaxed">
                      {res.description}
                    </p>

                    <div className="pt-2 flex items-center gap-3 text-xs">
                      <span className="font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                        {c.learnMore}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Thumbnail Icon Box */}
                  <div className="md:col-span-3 flex justify-end">
                    <div className="w-full md:w-[200px] h-[120px] rounded-2xl bg-white border border-slate-200/80 p-4 shadow-xs flex flex-col items-center justify-center text-center group-hover:border-red-300 group-hover:shadow-md transition-all">
                      <div className="p-3 bg-red-50 text-red-600 rounded-2xl mb-2">
                        {USEFUL_RESOURCE_ICONS[res.id] || <BookOpen className="h-6 w-6" />}
                      </div>
                      <span className="text-[11px] font-bold text-navy line-clamp-1">{res.title}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Useful;
