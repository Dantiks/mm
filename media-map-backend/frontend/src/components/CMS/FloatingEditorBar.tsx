import React from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { Edit3, Save, RotateCcw, Sparkles, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FloatingEditorBar: React.FC = () => {
  const {
    isEditorMode,
    toggleEditorMode,
    pendingChanges,
    saveChanges,
    discardChanges,
    isSaving,
    hasUnsavedChanges,
  } = useEditorMode();

  // Check if current user is logged in as admin or enabled editor mode
  const userJson = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const adminEditorMode = localStorage.getItem('adminEditorMode');
  let isAdmin = false;
  try {
    const user = userJson ? JSON.parse(userJson) : null;
    isAdmin = user?.role === 'admin' || Boolean(token) || adminEditorMode === 'true';
  } catch (e) {
    isAdmin = Boolean(token) || adminEditorMode === 'true';
  }

  // Only show for admin users or when admin editor mode is active
  if (!isAdmin && !isEditorMode) return null;

  const count = Object.keys(pendingChanges).length;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-navy/95 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-2xl border border-white/20 animate-in slide-in-from-bottom-5 duration-300">
      {/* Editor Toggle */}
      <button
        onClick={toggleEditorMode}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
          isEditorMode
            ? 'bg-navy text-white shadow-md shadow-navy/20'
            : 'bg-white/10 text-slate-300 hover:bg-white/20'
        }`}
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>{isEditorMode ? 'Режим редактора: Вкл' : 'Включить редактор'}</span>
      </button>

      {isEditorMode && (
        <>
          <div className="h-4 w-px bg-white/20" />

          {/* Pending Changes Badge */}
          <span className="text-xs font-mono text-gold flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3 animate-spin" />
            {count} {count === 1 ? 'изменение' : 'изменений'}
          </span>

          {/* Save Button */}
          <button
            onClick={saveChanges}
            disabled={!hasUnsavedChanges || isSaving}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              hasUnsavedChanges
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 animate-pulse'
                : 'bg-white/10 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <span className="animate-spin text-xs">⏳</span>
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Сохранить</span>
          </button>

          {/* Discard Button */}
          {hasUnsavedChanges && (
            <button
              onClick={discardChanges}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-navyCard text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Сбросить</span>
            </button>
          )}

          <div className="h-4 w-px bg-white/20" />

          {/* CMS Admin Panel Link */}
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
  );
};

export default FloatingEditorBar;
