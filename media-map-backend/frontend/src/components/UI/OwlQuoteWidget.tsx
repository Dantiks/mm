import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Quote, RefreshCw } from 'lucide-react';

const OWL_QUOTES = [
  {
    ru: 'Критическое мышление — ваш лучший щит против фейков и манипуляций в цифровом мире. Всегда доверяйте только фактам!',
    ky: 'Сынчыл ой жүгүртүү — санариптик дүйнөдөгү фейктерге жана манипуляцияларга каршы эң мыкты калканыңыз!',
    owlImage: '/owl-stop.png',
  },
  {
    ru: 'Всегда проверяйте первоисточник информации и дату публикации, прежде чем делить рассылкой в мессенджерах.',
    ky: 'Мессенджерлерде маалыматты бөлүшүүдөн мурда, ар дайым анын баштапкы булагын жана жарыяланган күнүн текшериңиз.',
    owlImage: '/owl-search.png',
  },
  {
    ru: 'Язык вражды и мошенничество разрушают информационную культуру. Будьте ответственным гражданином сети!',
    ky: 'Кастык тили жана алдамчылык маалыматтык маданиятты талкалайт. Желеде жоопкерчиликтүү жаран болуңуз!',
    owlImage: '/owl-law.png',
  },
  {
    ru: 'Цифровая гигиена так же важна, как и обычная: используйте двухфакторную аутентификацию и не переходите по сомнительным ссылкам.',
    ky: 'Санарип гигиенасы кадимкидей эле маанилүү: эки факторлуу аутентификацияны колдонуңуз жана күмөндүү шилтемелерди ачпаңыз.',
    owlImage: '/owl-stop.png',
  },
];

export const OwlQuoteWidget: React.FC = () => {
  const { language } = useLanguage();
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % OWL_QUOTES.length);
  };

  const current = OWL_QUOTES[quoteIndex];

  return (
    <section className="w-full bg-[#FFFFFF] border-t border-b border-slate-200/80 py-8 font-inter relative overflow-hidden">
      <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200 relative group">
          
          {/* Left Owl Image */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl bg-slate-50 p-2 border border-slate-200 shadow-inner flex items-center justify-center">
              <img
                src={current.owlImage}
                alt="Совёнок MediaMap"
                className="h-full w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to logo if owl image not found
                  (e.target as HTMLElement).setAttribute('src', '/media-map-logo.jpg');
                }}
              />
            </div>

            <div>
              <span className="font-mono text-[11px] font-black uppercase tracking-widest text-amber-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                {language === 'ky' ? '🦉 Совёнок кеңеши' : '🦉 Цитата от совёнка MediaMap'}
              </span>
              <h4 className="text-base font-black text-navy mt-1.5">
                {language === 'ky' ? 'Медиасабаттуулук эрежеси' : 'Правило медиаграмотности'}
              </h4>
            </div>
          </div>

          {/* Center Quote Text */}
          <div className="flex-1 border-l-2 border-slate-200 pl-4 sm:pl-6 my-2 md:my-0 space-y-1">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Quote className="h-5 w-5 rotate-180" />
            </div>
            <p className="text-sm sm:text-base font-serif italic text-slate-800 leading-relaxed font-medium">
              «{language === 'ky' ? current.ky : current.ru}»
            </p>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0">
            <button
              onClick={nextQuote}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-amber-900 text-xs font-bold transition-all border border-slate-200 shadow-2xs active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5 text-amber-700" />
              <span>{language === 'ky' ? 'Кийинки кеңеш' : 'Другая цитата'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwlQuoteWidget;
