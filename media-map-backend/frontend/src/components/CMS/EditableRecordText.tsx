import React, { useEffect, useRef, useState } from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { Check, X, Loader2, Pencil } from 'lucide-react';
import axiosApi from '../../axiosApi';

interface Props {
  /** Эндпоинт записи, например '/news'. */
  resource: string;
  /** ID записи. */
  id: number | string;
  /** Поле записи, например 'title'. */
  field: string;
  value: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** Вызывается после успешного сохранения, чтобы список перечитал данные. */
  onSaved?: () => void;
}

/**
 * Правка текста, который лежит не в site_texts, а в собственной таблице
 * (новости, заявки). Сохраняется сразу в запись — общий буфер правок здесь
 * не используется, потому что ключа в site_texts у такого текста нет.
 */
export const EditableRecordText: React.FC<Props> = ({
  resource,
  id,
  field,
  value,
  className = '',
  as: Component = 'span',
  onSaved,
}) => {
  const { isEditorMode } = useEditorMode();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setLocalValue(value), [value]);

  useEffect(() => {
    if (isEditing) {
      setDraft(localValue);
      setError(null);
      inputRef.current?.focus();
    }
  }, [isEditing]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isEditorMode) {
    return <Component className={className}>{localValue}</Component>;
  }

  const save = async () => {
    const next = draft.trim();
    if (!next || next === localValue) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      await axiosApi.put(`${resource}/${id}`, { [field]: next });
      setLocalValue(next);
      setIsEditing(false);
      onSaved?.();
    } catch (err: any) {
      const status = err?.response?.status;
      setError(
        status === 401 || status === 403
          ? 'Нет прав на изменение'
          : 'Не удалось сохранить',
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <span className="relative block">
        <textarea
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsEditing(false);
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) void save();
          }}
          rows={3}
          className="w-full rounded-lg border-2 border-blue-500 p-2 text-sm text-navy outline-none"
        />
        <span className="flex items-center gap-1 mt-1">
          <button
            type="button"
            onClick={save}
            disabled={isSaving}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-600 text-white text-[10px] font-bold cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            Сохранить
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
          >
            <X className="w-3 h-3" />
            Отмена
          </button>
          {error && <span className="text-[10px] text-rose-600 font-bold">{error}</span>}
        </span>
      </span>
    );
  }

  return (
    <span className="relative group inline-block max-w-full">
      {/* Синяя рамка, а не красная: этот текст сохраняется сразу в запись,
          а не копится в общем буфере правок. */}
      <Component
        className={`${className} border-2 border-dashed border-blue-400 hover:border-blue-600 rounded-lg px-1 cursor-text`}
        onClick={() => setIsEditing(true)}
      >
        {localValue}
      </Component>
      <span className="absolute -top-4 left-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1 pointer-events-none">
        <Pencil className="w-2.5 h-2.5" />
        {resource}/{id}.{field}
      </span>
    </span>
  );
};

export default EditableRecordText;
