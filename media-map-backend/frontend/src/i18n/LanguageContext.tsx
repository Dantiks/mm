import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations, { Language, Translations } from './translations';
import axiosApi from '../axiosApi';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  refreshSiteTexts: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'mediamap-language';

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'ky' ? 'ky' : 'ru';
};

// Helper function to set nested key (e.g., 'home.heroTitle')
const setDeepValue = (obj: any, path: string, value: string) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!current[k] || typeof current[k] !== 'object') {
      current[k] = {};
    }
    current = current[k];
  }
  current[keys[keys.length - 1]] = value;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [dbTexts, setDbTexts] = useState<Record<string, { ru: string; ky: string }>>({});

  const fetchSiteTexts = async () => {
    try {
      const response = await axiosApi.get('/site-texts');
      if (response.data) {
        setDbTexts(response.data);
      }
    } catch (err) {
      console.warn('Could not load dynamic site texts, falling back to local translations', err);
    }
  };

  useEffect(() => {
    fetchSiteTexts();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const computedTranslations = useMemo(() => {
    // Deep clone static translations for the current language
    const base = JSON.parse(JSON.stringify(translations[language]));

    // Apply database text overrides
    for (const [key, val] of Object.entries(dbTexts)) {
      const textVal = language === 'ky' ? val.ky : val.ru;
      if (textVal) {
        setDeepValue(base, key, textVal);
      }
    }

    return base as Translations;
  }, [language, dbTexts]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: computedTranslations,
      refreshSiteTexts: fetchSiteTexts,
    }),
    [language, computedTranslations]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
