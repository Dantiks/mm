import React, { useRef, useState } from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { ImageUp, RotateCcw, Loader2, Trash2, Undo2 } from 'lucide-react';
import axiosApi from '../../axiosApi';

interface Props {
  /** Ключ в site-texts, где хранится путь к картинке. */
  imageKey: string;
  /** Путь по умолчанию, если в базе ключа ещё нет. */
  fallbackSrc: string;
  alt: string;
  className?: string;
}

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'];

/**
 * Инлайн-замена картинки. Путь к файлу хранится в той же таблице site_texts —
 * отдельная сущность не нужна, а править можно тем же режимом редактора.
 */
export const EditableImage: React.FC<Props> = ({ imageKey, fallbackSrc, alt, className = '' }) => {
  const { isEditorMode, registerChange, revertChange, pendingChanges, isHidden, setHidden } =
    useEditorMode();
  const { siteTexts, language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Картинка одна на оба языка, но храним в обеих колонках — берём любую.
  const entry = siteTexts[imageKey];
  const stored = language === 'ky' ? entry?.ky || entry?.ru : entry?.ru || entry?.ky;
  const savedSrc = stored || fallbackSrc;
  const pending = pendingChanges[imageKey];
  const isDirty = pending !== undefined;
  const src = isDirty ? pending : savedSrc;

  const hidden = isHidden(imageKey);

  if (!isEditorMode) {
    if (hidden) return null;
    return <img src={src} alt={alt} className={className} />;
  }

  const handlePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setError(null);

    if (!ALLOWED.includes(file.type)) {
      setError('Только PNG, JPEG, WebP, GIF или SVG');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Файл больше 5 МБ');
      return;
    }

    const form = new FormData();
    form.append('image', file);

    setIsUploading(true);
    try {
      const res = await axiosApi.post('/site-texts/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      registerChange(imageKey, res.data.path, { bothLanguages: true });
    } catch (err: any) {
      const status = err?.response?.status;
      setError(
        status === 403
          ? 'Нужна роль администратора'
          : err?.response?.data?.message || 'Не удалось загрузить файл',
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <span
      className="relative group inline-block max-w-full"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`${className} border-2 border-dashed rounded-lg transition-all ${
          isDirty ? 'border-emerald-500' : 'border-red-400 group-hover:border-red-600'
        }`}
      />

      <span data-cms-control className="absolute inset-0 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-navy/60 rounded-lg">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          title="Заменить изображение"
          className="bg-white text-navy text-[10px] font-bold px-2 py-1 rounded-md shadow-md flex items-center gap-1 hover:bg-gold cursor-pointer"
        >
          {isUploading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <ImageUp className="w-3 h-3" />
          )}
          <span>{isUploading ? 'Загрузка' : 'Заменить'}</span>
        </button>

        {isDirty && !hidden && (
          <button
            type="button"
            onClick={() => revertChange(imageKey, { bothLanguages: true })}
            title="Вернуть прежнее изображение"
            className="bg-white text-navy text-[10px] font-bold px-2 py-1 rounded-md shadow-md flex items-center gap-1 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setHidden(imageKey, !hidden)}
          title={hidden ? 'Вернуть изображение' : 'Удалить изображение со страницы'}
          className={`text-[10px] font-bold px-2 py-1 rounded-md shadow-md flex items-center gap-1 cursor-pointer ${
            hidden
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-rose-600 hover:bg-rose-600 hover:text-white'
          }`}
        >
          {hidden ? <Undo2 className="w-3 h-3" /> : <Trash2 className="w-3 h-3" />}
        </button>
      </span>

      {error && (
        <span className="absolute -bottom-5 left-0 z-30 bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md whitespace-nowrap">
          {error}
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED.join(',')}
        onChange={handlePick}
        className="hidden"
      />
    </span>
  );
};

export default EditableImage;
