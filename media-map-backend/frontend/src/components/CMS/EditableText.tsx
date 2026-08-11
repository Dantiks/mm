import React, { useEffect, useRef, useState } from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { Edit2, RotateCcw, Trash2, Undo2 } from 'lucide-react';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'li';

interface Props {
  textKey: string;
  value: string;
  className?: string;
  as?: Tag;
  /** Разрешить переносы строк (Enter). По умолчанию Enter = завершить правку. */
  multiline?: boolean;
  /** Ограничение длины, чтобы вёрстка не поехала. */
  maxLength?: number;
}

// Блочные теги нельзя оборачивать в span — браузер переставит DOM.
const BLOCK_TAGS: Tag[] = ['h1', 'h2', 'h3', 'h4', 'p', 'div', 'li'];

export const EditableText: React.FC<Props> = ({
  textKey,
  value,
  className = '',
  as: Component = 'span',
  multiline = false,
  maxLength = 5000,
}) => {
  const { isEditorMode, registerChange, revertChange, pendingChanges, isHidden, setHidden } =
    useEditorMode();
  const elementRef = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const pending = pendingChanges[textKey];
  const isDirty = pending !== undefined;
  const displayValue = isDirty ? pending : value;
  const hidden = isHidden(textKey);

  // contentEditable и React дерутся за DOM: если отдать значение через
  // children, React перерисует узел на каждый ввод и каретка прыгнет
  // в начало. Поэтому пишем в DOM вручную и только когда поле не в фокусе.
  useEffect(() => {
    const el = elementRef.current;
    if (!el || !isEditorMode) return;
    if (isFocused) return;
    if (el.innerText !== displayValue) {
      el.innerText = displayValue;
    }
  }, [displayValue, isEditorMode, isFocused]);

  if (!isEditorMode) {
    if (hidden) return null;
    return (
      <Component className={className} style={{ whiteSpace: 'pre-line' }}>
        {displayValue}
      </Component>
    );
  }

  const commit = () => {
    const el = elementRef.current;
    if (!el) return;

    let newText = el.innerText.replace(/ /g, ' ');
    newText = multiline ? newText.replace(/\n{3,}/g, '\n\n').trim() : newText.replace(/\s+/g, ' ').trim();

    if (newText.length > maxLength) {
      newText = newText.slice(0, maxLength);
    }

    // Пустой текст сломал бы вёрстку и не прошёл бы валидацию на сервере.
    if (!newText) {
      el.innerText = value;
      revertChange(textKey);
      return;
    }

    if (newText === value) {
      // Вернули как было — правка не нужна, убираем из буфера.
      revertChange(textKey);
      return;
    }

    registerChange(textKey, newText);
  };

  const handleBlur = () => {
    setIsFocused(false);
    commit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (elementRef.current) {
        elementRef.current.innerText = value;
      }
      revertChange(textKey);
      (e.target as HTMLElement).blur();
      return;
    }

    if (e.key === 'Enter' && (!multiline || e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  // Вставка из Word/браузера тащит за собой HTML со стилями — режем до текста.
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, multiline ? text : text.replace(/\s+/g, ' '));
  };

  const handleRevert = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (elementRef.current) {
      elementRef.current.innerText = value;
    }
    revertChange(textKey);
  };

  const borderColor = hidden
    ? 'border-rose-600 bg-rose-50/40 opacity-40 line-through'
    : isDirty
      ? 'border-emerald-500 hover:border-emerald-600 bg-emerald-50/30'
      : 'border-red-400 hover:border-red-600 bg-red-50/20 hover:bg-red-50/40';

  const editable = (
    <Component
      ref={elementRef as any}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={`Редактируемый текст: ${textKey}`}
      tabIndex={0}
      spellCheck
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      // Текст часто лежит внутри ссылки или кнопки. Без этого клик уходил
      // родителю: вместо правки происходил переход на другую страницу.
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      // Фокус в contentEditable ставится по mousedown, поэтому здесь только
      // гасим всплытие, но не отменяем событие — иначе каретка не встанет.
      onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
      style={{ whiteSpace: multiline ? 'pre-wrap' : 'normal' }}
      className={`${className} outline-none border-2 border-dashed ${borderColor} rounded-lg px-1 transition-all cursor-text focus:ring-2 focus:ring-red-500/20`}
    >
      {displayValue}
    </Component>
  );

  const badge = (
    <span data-cms-control className="absolute -top-4 left-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
      <span className="bg-navy text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
        <Edit2 className="w-2.5 h-2.5 text-gold" />
        {textKey}
      </span>
      {isDirty && !hidden && (
        <button
          type="button"
          onMouseDown={handleRevert}
          title="Вернуть исходный текст"
          className="bg-white text-navy border border-navy/20 text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-md flex items-center gap-1 hover:bg-rose-50 hover:text-rose-600 cursor-pointer pointer-events-auto"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          Откатить
        </button>
      )}

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setHidden(textKey, !hidden);
        }}
        title={hidden ? 'Вернуть текст на страницу' : 'Удалить текст со страницы'}
        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-md flex items-center gap-1 cursor-pointer pointer-events-auto border ${
          hidden
            ? 'bg-emerald-500 text-white border-emerald-600'
            : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white'
        }`}
      >
        {hidden ? <Undo2 className="w-2.5 h-2.5" /> : <Trash2 className="w-2.5 h-2.5" />}
        {hidden ? 'Вернуть' : 'Удалить'}
      </button>
    </span>
  );

  // Блочный тег внутри span — невалидный HTML, поэтому обёртка совпадает по типу.
  const isBlock = BLOCK_TAGS.includes(Component as Tag);
  const wrapperClass = isBlock
    ? 'relative group block max-w-full'
    : 'relative group inline-block max-w-full';

  return isBlock ? (
    <div className={wrapperClass}>
      {badge}
      {editable}
    </div>
  ) : (
    <span className={wrapperClass}>
      {badge}
      {editable}
    </span>
  );
};

export default EditableText;
