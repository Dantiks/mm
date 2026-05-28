import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { createViolationType, updateViolationType } from "../../features/violationTypes/violationTypesThunks";
import { ViolationTypeCreation, ViolationTypeMutation } from "../../types";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectCreateViolationTypeLoading } from "../../features/violationTypes/violationTypesSlice";
import { Type, UploadCloud, CheckCircle2, Loader2, AlertCircle, X, ImageIcon } from "lucide-react";
import { apiURL } from "../../utils/constants";

interface Props {
  item?: ViolationTypeMutation;
  onSuccess: () => void;
}

const ViolationTypeForm: React.FC<Props> = ({ item, onSuccess }) => {
  const [formData, setFormData] = useState<ViolationTypeCreation>({
    violationType: item ? item.violationType : '',
    icon: null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateViolationTypeLoading);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
      setFormData((prevData) => ({ ...prevData, icon: files[0] }));
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);
    }
  };

  const handleCancelFile = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    setFormData((prevData) => ({ ...prevData, icon: null }));
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      await dispatch(updateViolationType({ ...formData, id: item.id }));
    } else {
      await dispatch(createViolationType(formData));
    }
    // Сбрасываем форму полностью
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setFormData({ violationType: '', icon: null });
    setPreview(null);
    onSuccess();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const currentIconUrl = item?.icon ? `${apiURL}static/uploads/icons/${item.icon}` : null;

  return (
      <form autoComplete="off" onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
            <Type className="w-4 h-4 text-blue-500" />
            Название нарушения
          </label>
          <div className="relative">
            <input
                type="text"
                placeholder="Напр: Превышение скорости"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 px-5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-slate-700 placeholder:text-slate-400"
                name="violationType"
                value={formData.violationType}
                onChange={inputChangeHandler}
                required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-blue-500" />
              Иконка категории
            </label>
            {(item && currentIconUrl) && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 border border-slate-100 rounded-full px-2 py-0.5">
                  <ImageIcon className="w-3 h-3 text-emerald-500" />
                  <span>Текущая есть</span>
                </div>
            )}
          </div>

          <div
              onClick={() => fileInputRef.current?.click()}
              className={`
            relative cursor-pointer group border-2 border-dashed rounded-2xl p-6 transition-all duration-200 min-h-[160px] flex items-center justify-center
            ${preview ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30'}
          `}
          >
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={fileChangeHandler}
                required={!item}
            />

            <div className="flex flex-col items-center justify-center gap-3 w-full">
              {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Preview" className="w-20 h-20 object-contain drop-shadow-md" />

                    <button
                        type="button"
                        onClick={handleCancelFile}
                        className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 shadow-lg shadow-rose-100/50 transition-all active:scale-95 group-hover:scale-110"
                        title="Отменить выбор"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="absolute -bottom-2 -left-2 bg-emerald-100 text-emerald-700 rounded-full p-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
              ) : (
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                  </div>
              )}

              <div className="text-center">
                <p className="text-sm font-semibold text-slate-600">
                  {preview ? 'Новая иконка готова' : (item ? 'Нажмите, чтобы ЗАМЕНИТЬ иконку' : 'Нажмите, чтобы загрузить')}
                </p>
                <p className="text-xs text-slate-400 mt-1">PNG, SVG или ICO (макс. 1MB)</p>
              </div>
            </div>
          </div>
        </div>

        <button
            type="submit"
            disabled={loading}
            className={`
          w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg
          ${loading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200 active:scale-[0.98]'}
        `}
        >
          {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
              item ? 'Сохранить изменения' : 'Создать категорию'
          )}
        </button>

        {item && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <p className="text-[11px] text-amber-700 leading-tight">
                Изменения коснутся только названия и иконки. Прикрепленные маркеры останутся на карте.
              </p>
            </div>
        )}
      </form>
  );
};

export default ViolationTypeForm;