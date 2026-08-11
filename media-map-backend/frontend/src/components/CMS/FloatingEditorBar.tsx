import React, { useState } from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Edit3,
  Save,
  RotateCcw,
  Sliders,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Undo2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const plural = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'изменение';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'изменения';
  return 'изменений';
};

export const FloatingEditorBar: React.FC = () => {
  const {
    isEditorMode,
    toggleEditorMode,
    pendingByLanguage,
    revertChange,
    saveChanges,
    discardChanges,
    isSaving,
    hasUnsavedChanges,
    totalPendingCount,
    toast,
    clearToast,
    canEdit,
    hiddenKeys,
    setHidden,
  } = useEditorMode();
  const { language } = useLanguage();
  const [isListOpen, setIsListOpen] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  // Панель показывается только администратору. Раньше её видел любой
  // залогиненный пользователь, а флаг в localStorage открывал её кому угодно.
  if (!canEdit) return null;

  const ruKeys = Object.keys(pendingByLanguage.ru);
  const kyKeys = Object.keys(pendingByLanguage.ky);

  const toastStyle =
    toast?.kind === 'success'
      ? 'bg-emerald-600'
      : toast?.kind === 'error'
        ? 'bg-rose-600'
        : 'bg-navy';

  const ToastIcon =
    toast?.kind === 'success' ? CheckCircle2 : toast?.kind === 'error' ? AlertTriangle : Info;

  return (
    <>
      {toast && (
        <div
          role="status"
          onClick={clearToast}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-start gap-2 ${toastStyle} text-white px-4 py-2.5 rounded-xl shadow-2xl max-w-md cursor-pointer`}
        >
          <ToastIcon className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="text-xs font-semibold leading-snug">{toast.text}</span>
        </div>
      )}

      {isEditorMode && isListOpen && totalPendingCount > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-80 max-h-72 overflow-y-auto bg-navy/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/20 p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold mb-2">
            Несохранённые правки
          </p>

          {(['ru', 'ky'] as const).map((lang) => {
            const keys = lang === 'ru' ? ruKeys : kyKeys;
            if (keys.length === 0) return null;
            return (
              <div key={lang} className="mb-2">
                <p className="text-[9px] font-mono text-gold font-bold mb-1">
                  {lang === 'ru' ? 'Русский' : 'Кыргызский'} · {keys.length}
                </p>
                {keys.map((k) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-2 py-0.5 border-b border-white/5"
                  >
                    <span className="text-[10px] font-mono truncate" title={k}>
                      {k}
                    </span>
                    <button
                      type="button"
                      onClick={() => revertChange(k)}
                      title="Откатить эту правку"
                      className="shrink-0 text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {isEditorMode && isTrashOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-80 max-h-72 overflow-y-auto bg-navy/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/20 p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold mb-2">
            Удалённые объекты
          </p>

          {hiddenKeys.length === 0 ? (
            <p className="text-[11px] text-slate-400">Ничего не удалено.</p>
          ) : (
            hiddenKeys.map((k) => (
              <div
                key={k}
                className="flex items-center justify-between gap-2 py-1 border-b border-white/5"
              >
                <span className="text-[10px] font-mono truncate" title={k}>
                  {k}
                </span>
                <button
                  type="button"
                  onClick={() => setHidden(k, false)}
                  title="Вернуть объект"
                  className="shrink-0 flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md cursor-pointer"
                >
                  <Undo2 className="w-3 h-3" />
                  Вернуть
                </button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-navy/95 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-2xl border border-white/20">
        <button
          onClick={toggleEditorMode}
          title="Ctrl+E"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            isEditorMode
              ? 'bg-red-600 text-white shadow-md shadow-red-500/30'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditorMode ? 'Режим редактора: Вкл' : 'Включить редактор'}</span>
        </button>

        {isEditorMode && (
          <>
            <div className="h-4 w-px bg-white/20" />

            {/* Какой язык правится сейчас — без этого правка уезжает не в ту колонку */}
            <span className="text-[10px] font-bold uppercase tracking-wide bg-white/10 px-2 py-1 rounded-full">
              Правим: {language === 'ru' ? 'RU' : 'KY'}
            </span>

            <button
              type="button"
              onClick={() => setIsListOpen((v) => !v)}
              disabled={totalPendingCount === 0}
              className="text-xs font-mono text-gold flex items-center gap-1 font-bold disabled:opacity-50 cursor-pointer"
            >
              {totalPendingCount} {plural(totalPendingCount)}
              {totalPendingCount > 0 &&
                (isListOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronUp className="w-3 h-3" />
                ))}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsTrashOpen((v) => !v);
                setIsListOpen(false);
              }}
              title="Удалённые объекты"
              className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {hiddenKeys.length}
            </button>

            <button
              onClick={saveChanges}
              disabled={!hasUnsavedChanges || isSaving}
              title="Ctrl+S"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                hasUnsavedChanges && !isSaving
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 cursor-pointer'
                  : 'bg-white/10 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-pulse' : ''}`} />
              <span>{isSaving ? 'Сохраняю…' : 'Сохранить'}</span>
            </button>

            {hasUnsavedChanges && (
              <button
                onClick={() => {
                  if (window.confirm(`Сбросить все правки (${totalPendingCount})?`)) {
                    discardChanges();
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Сбросить</span>
              </button>
            )}

            <div className="h-4 w-px bg-white/20" />

            <Link
              to="/admin/texts"
              className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white transition-colors"
            >
              <Sliders className="w-3 h-3 text-gold" />
              <span>Все тексты (CMS)</span>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default FloatingEditorBar;
