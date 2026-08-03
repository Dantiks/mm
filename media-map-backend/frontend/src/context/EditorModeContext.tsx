import React, { createContext, useContext, useState } from 'react';
import axiosApi from '../axiosApi';
import { useLanguage } from '../i18n/LanguageContext';

interface EditorModeContextValue {
  isEditorMode: boolean;
  toggleEditorMode: () => void;
  setEditorMode: (val: boolean) => void;
  pendingChanges: Record<string, string>;
  registerChange: (key: string, newValue: string) => void;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
}

const EditorModeContext = createContext<EditorModeContextValue | undefined>(undefined);

export const EditorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { language, refreshSiteTexts } = useLanguage();

  const toggleEditorMode = () => {
    setIsEditorMode((prev) => !prev);
  };

  const registerChange = (key: string, newValue: string) => {
    setPendingChanges((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const saveChanges = async () => {
    const keys = Object.keys(pendingChanges);
    if (keys.length === 0) return;

    setIsSaving(true);
    try {
      // First get current site texts to preserve the non-active language
      const currentRes = await axiosApi.get('/site-texts');
      const currentData = currentRes.data || {};

      const itemsToUpdate = keys.map((k) => {
        const existing = currentData[k] || { ru: '', ky: '' };
        return {
          key: k,
          valueRu: language === 'ru' ? pendingChanges[k] : existing.ru || pendingChanges[k],
          valueKy: language === 'ky' ? pendingChanges[k] : existing.ky || pendingChanges[k],
        };
      });

      await axiosApi.put('/site-texts', { items: itemsToUpdate });
      await refreshSiteTexts();
      setPendingChanges({});
      alert('Все изменения текста успешно сохранены на сайте!');
    } catch (err) {
      console.error('Failed to save inline site texts:', err);
      alert('Ошибка при сохранении изменений.');
    } finally {
      setIsSaving(false);
    }
  };

  const discardChanges = () => {
    setPendingChanges({});
  };

  return (
    <EditorModeContext.Provider
      value={{
        isEditorMode,
        toggleEditorMode,
        setEditorMode: setIsEditorMode,
        pendingChanges,
        registerChange,
        saveChanges,
        discardChanges,
        isSaving,
        hasUnsavedChanges: Object.keys(pendingChanges).length > 0,
      }}
    >
      {children}
    </EditorModeContext.Provider>
  );
};

export const useEditorMode = () => {
  const ctx = useContext(EditorModeContext);
  if (!ctx) throw new Error('useEditorMode must be used within an EditorModeProvider');
  return ctx;
};
