import React, { useEffect, useRef, useState } from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Pencil, Check, X } from 'lucide-react';

interface Props {
  /** Ключ в site-texts. */
  textKey: string;
  /** Значение по умолчанию, если ключа ещё нет в базе. */
  value: string;
  /** Рендер-проп: получает актуальный текст и возвращает разметку. */
  children: (value: string) => React.ReactNode;
  /** Подпись во всплывающем редакторе — что именно правим. */
  label?: string;
}

/**
 * Для текста, который живёт в атрибуте, а не в разметке: placeholder, alt,
 * title, aria-label. Кликнуть по нему нельзя, поэтому в режиме редактора
 * рядом появляется карандаш, открывающий маленькое поле правки.
 */
export const EditableAttr: React.FC<Props> = ({ textKey, value, children, label }) => {
  const { isEditorMode, registerChange, revertChange, pendingChanges } = useEditorMode();
  const { siteTexts, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const entry = siteTexts[textKey];
  const saved = (language === 'ky' ? entry?.ky : entry?.ru) || value;
  const pending = pendingChanges[textKey];
  const isDirty = pending !== undefined;
  const current = isDirty ? pending : saved;

  useEffect(() => {
    if (isOpen) {
      setDraft(current);
      inputRef.current?.focus();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isEditorMode) {
    return <>{children(current)}</>;
  }

  const commit = () => {
    const next = draft.trim();
    setIsOpen(false);
    if (!next || next === saved) {
      revertChange(textKey);
      return;
    }
    registerChange(textKey, next);
  };

  return (
    <span
      className="relative inline-block w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {children(current)}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        title={`Изменить: ${label || textKey}`}
        className={`absolute -top-2 -right-2 z-30 p-1 rounded-md shadow-md border cursor-pointer ${
          isDirty
            ? 'bg-emerald-500 text-white border-emerald-600'
            : 'bg-white text-navy border-navy/20 hover:bg-gold'
        }`}
      >
        <Pencil className="w-3 h-3" />
      </button>

      {isOpen && (
        <span className="absolute z-40 top-6 right-0 flex items-center gap-1 bg-navy/95 backdrop-blur-md p-2 rounded-xl shadow-2xl border border-white/20">
          <span className="text-[9px] font-mono text-gold whitespace-nowrap max-w-[120px] truncate">
            {textKey}
          </span>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') setIsOpen(false);
            }}
            className="w-56 px-2 py-1 rounded-md text-xs text-navy outline-none"
          />
          <button
            type="button"
            onClick={commit}
            title="Применить"
            className="p-1 rounded-md bg-emerald-500 text-white cursor-pointer"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            title="Отмена"
            className="p-1 rounded-md bg-white/10 text-slate-300 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
    </span>
  );
};

export default EditableAttr;
