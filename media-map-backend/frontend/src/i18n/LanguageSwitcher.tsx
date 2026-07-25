import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`flex items-center rounded-full border border-lineLight bg-white p-[2px] text-[12px] font-bold ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('ru')}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          language === 'ru' ? 'bg-navy text-white' : 'text-slateBody hover:text-navy'
        }`}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ky')}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          language === 'ky' ? 'bg-navy text-white' : 'text-slateBody hover:text-navy'
        }`}
      >
        KY
      </button>
    </div>
  );
};

export default LanguageSwitcher;
