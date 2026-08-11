import React from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { Trash2, Undo2, Box } from 'lucide-react';

interface Props {
  /** Ключ объекта. Должен быть стабильным: по нему хранится флаг удаления. */
  blockKey: string;
  /** Человеческое название — показывается в списке удалённых. */
  label?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Обёртка вокруг цельного объекта — карточки, секции, пункта меню.
 * Позволяет удалить его со страницы и вернуть обратно.
 *
 * Удаление мягкое: объект помечается флагом и перестаёт показываться
 * посетителям, но остаётся в коде и в базе. В режиме редактора он виден
 * полупрозрачным, с кнопкой возврата.
 */
export const EditableBlock: React.FC<Props> = ({
  blockKey,
  label,
  children,
  className = '',
}) => {
  const { isEditorMode, isHidden, setHidden } = useEditorMode();
  const hidden = isHidden(blockKey);

  if (!isEditorMode) {
    return hidden ? null : <>{children}</>;
  }

  return (
    <div className={`relative group/block ${className}`}>
      <div className={hidden ? 'opacity-25 grayscale pointer-events-none' : ''}>
        {children}
      </div>

      <div className="absolute top-1 right-1 z-40 flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity">
        <span
          className="bg-navy/90 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md shadow-md flex items-center gap-1 max-w-[160px] truncate"
          title={blockKey}
        >
          <Box className="w-2.5 h-2.5 text-gold shrink-0" />
          {label || blockKey}
        </span>

        {hidden ? (
          <button
            type="button"
            onClick={() => setHidden(blockKey, false)}
            title="Вернуть объект"
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded-md shadow-md cursor-pointer"
          >
            <Undo2 className="w-3 h-3" />
            Вернуть
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setHidden(blockKey, true)}
            title="Удалить объект со страницы"
            className="flex items-center gap-1 bg-white hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 text-[9px] font-bold px-2 py-1 rounded-md shadow-md cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            Удалить
          </button>
        )}
      </div>

      {hidden && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
            Удалено — не видно посетителям
          </span>
        </div>
      )}
    </div>
  );
};

export default EditableBlock;
