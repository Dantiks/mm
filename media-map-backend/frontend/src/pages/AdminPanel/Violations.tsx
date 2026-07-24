import React, { useEffect, useState } from 'react';
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { fetchViolationTypes } from "../../features/violationTypes/violationTypesThunks";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectViolationTypes } from "../../features/violationTypes/violationTypesSlice";
import ViolationTypeForm from "../../components/Forms/ViolationTypeForm";
import { apiURL } from "../../utils/constants";
import {
  PlusCircle,
  Settings2,
  PencilLine,
  Trash2,
  Layers,
  XCircle
} from "lucide-react";

const Violations = () => {
  const [editViolationId, setEditViolationId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const violationTypes = useAppSelector(selectViolationTypes);

  useEffect(() => {
    dispatch(fetchViolationTypes());
  }, [dispatch]);

  const refreshViolationTypes = () => {
    dispatch(fetchViolationTypes());
    setEditViolationId(null); // Закрываем форму после успеха
  };

  const handleEditClick = (id: number) => {
    setEditViolationId(editViolationId === id ? null : id);
  };

  return (
      <div className="max-w-6xl">
        {/* Заголовок страницы */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-navy rounded-2xl shadow-lg">
            <Settings2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Виды нарушений</h1>
            <p className="text-sm text-slate-500">Управление категориями и иконками для карты</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Левая колонка: Форма добавления (2 части сетки) */}
          <div className="xl:col-span-2">
            <div className="bg-white  border border-slate-100 p-8 sticky top-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <PlusCircle className="w-5 h-5 text-navy" />
                <h2 className="text-lg font-bold text-slate-800">Новый вид</h2>
              </div>
              <ViolationTypeForm onSuccess={refreshViolationTypes} />
            </div>
          </div>

          {/* Правая колонка: Список (3 части сетки) */}
          <div className="xl:col-span-3">
            <div className="bg-white border border-slate-100 p-8 shadow-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-slate-400" />
                  <h2 className="text-lg font-bold text-slate-800">Существующие типы</h2>
                </div>
                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-full border border-slate-100">
                Всего: {violationTypes.length}
              </span>
              </div>

              <div className="space-y-4">
                {violationTypes.length ? (
                    violationTypes.map((item) => {
                      const isEditing = editViolationId === item.id;
                      return (
                          <div key={item.id} className="space-y-3">
                            <div
                                className={`
                          flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                          ${isEditing
                                    ? 'border-gold bg-cream shadow-sm ring-4 ring-creamPill'
                                    : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white hover:shadow-md'}
                        `}
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-2">
                                  <img
                                      src={`${apiURL}static/uploads/icons/${item.icon}`}
                                      alt={item.violationType}
                                      className="w-full h-full object-contain"
                                  />
                                </div>
                                <span className="font-semibold text-slate-700">{item.violationType}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleEditClick(item.id)}
                                    className={`p-2.5 rounded-xl transition-all ${
                                        isEditing
                                            ? 'bg-navy text-white shadow-md'
                                            : 'text-slate-400 hover:bg-white hover:text-navy hover:shadow-sm'
                                    }`}
                                >
                                  {isEditing ? <XCircle className="w-5 h-5" /> : <PencilLine className="w-5 h-5" />}
                                </button>
                                <button
                                    type="button"
                                    className="p-2.5 rounded-xl text-slate-400 hover:bg-white hover:text-rose-500 hover:shadow-sm transition-all"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            {/* Анимированная форма редактирования внутри списка */}
                            {isEditing && (
                                <div className="p-6 bg-white border-2 border-lineLight rounded-[16px] shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                                  <div className="flex items-center gap-2 mb-4 text-goldDeep">
                                    <PencilLine className="w-4 h-4" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Редактирование категории</span>
                                  </div>
                                  <ViolationTypeForm
                                      item={item}
                                      onSuccess={refreshViolationTypes}
                                  />
                                </div>
                            )}
                          </div>
                      );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400 border-2 border-dashed border-slate-100 rounded-[2rem]">
                      <Layers className="w-12 h-12 mb-4 opacity-10" />
                      <p className="font-medium">Список пуст</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Violations;