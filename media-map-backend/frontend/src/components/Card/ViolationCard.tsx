import React, { useState } from 'react';
import { MarkerBeforeModeratorMutation, MarkerOnMap } from "../../types";
import { apiURL } from "../../utils/constants";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import {
  deleteMarker,
  fetchMarkersBeforeMap,
  fetchMarkersForMap,
  fetchOneMarker
} from "../../features/markers/markersThunks";
import { useLocation, useNavigate } from "react-router-dom";
import ModalWindow from "../Modals/ModalWindow";
import ViolationEditForm from "../Forms/ViolationEditForm";
import axiosApi from "../../axiosApi";
import {
  MapPin,
  Link2,
  MessageSquare,
  Trash2,
  Edit3,
  Globe,
  ExternalLink,
  Sparkles
} from "lucide-react";

interface Props {
  item: MarkerBeforeModeratorMutation | MarkerOnMap;
}

const ViolationCard: React.FC<Props> = ({ item }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      await dispatch(deleteMarker(id));
      if (pathname.includes('/approved')) {
        await dispatch(fetchMarkersForMap());
      }
      if (pathname.includes('/main')) {
        await dispatch(fetchMarkersBeforeMap());
      }
    }
  };

  const handleEditMode = () => setEditMode(!editMode);

  const publishMarkerHandler = () => {
    dispatch(fetchOneMarker(item.id));
    navigate('/');
  };

  const [aiLoading, setAiLoading] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(
    item.moderatorComment && !item.moderatorComment.includes('обрабатывается') ? item.moderatorComment : null
  );

  const handleReAnalyzeAi = async () => {
    setAiLoading(true);
    try {
      const contentParts = [
        item.authorComment ? `Текст заявки/Комментарий: "${item.authorComment}"` : '',
        item.mediaLink ? `Ссылка/Источник: ${item.mediaLink}` : '',
        `Локация заявки: ${item.authorCity}, ${item.authorRegion}`,
        item.image ? `Прикреплен скриншот: ${item.image}` : ''
      ].filter(Boolean).join('\n') || `Заявка по городу ${item.authorCity}`;

      const { data } = await axiosApi.post('/ai/analyze', { content: contentParts });
      if (data && data.analysis) {
        const newComment = `🤖 [Автоматический ИИ-разбор GPT-4o mini]:\n${data.analysis}`;
        setAiNote(newComment);
      }
    } catch (e) {
      console.error('Ошибка при вызове ИИ:', e);
    } finally {
      setAiLoading(false);
    }
  };

  React.useEffect(() => {
    if (!aiNote) {
      handleReAnalyzeAi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div
          className="p-6 bg-white rounded-[16px] border border-lineLight font-inter"
          onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-cream rounded-[12px] border border-lineLight">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Локация</span>
                </div>
                <p className="text-slate-700 font-medium">{item.authorRegion}</p>
                <p className="text-slate-500 text-sm">{item.authorCity}</p>
              </div>

              <div className="p-4 bg-cream rounded-[12px] border border-lineLight">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Link2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Источник</span>
                </div>
                {item.mediaLink ? (
                    <a
                        href={item.mediaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-goldDeep hover:underline font-semibold text-sm flex items-center gap-1 break-all"
                    >
                      Перейти по ссылке <ExternalLink className="w-3 h-3" />
                    </a>
                ) : (
                    <p className="text-slate-400 text-sm">Отсутствует</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1 p-2 bg-creamPill rounded-lg">
                  <MessageSquare className="w-4 h-4 text-navy" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Комментарий заявителя</span>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    {item.authorComment || 'Комментарий не оставлен'}
                  </p>
                </div>
              </div>

              {/* Блок анализа ИИ / Заметки модератора */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>ИИ-Заключение (GPT-4o mini) & Заметка</span>
                  </div>
                  <button
                    onClick={handleReAnalyzeAi}
                    disabled={aiLoading}
                    className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition-all disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    {aiLoading ? 'Анализ...' : 'Обновить ИИ-разбор'}
                  </button>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap font-medium">
                  {aiNote || 'ИИ-заключение обрабатывается...'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Прикрепленный скриншот</span>
            {item.image ? (
                <div className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-inner bg-slate-50">
                  <img
                      src={`${apiURL}static/uploads/screenshots/${item.image}`}
                      alt="Скриншот нарушения"
                      className="w-full h-auto object-cover max-h-[300px] transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        if (!e.currentTarget.src.includes('/news1.png')) {
                          e.currentTarget.src = '/news1.png';
                        }
                      }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>
            ) : (
                <div className="h-[200px] flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                  <Globe className="w-10 h-10 mb-2 opacity-20" />
                  <span className="text-sm font-medium">Изображение отсутствует</span>
                </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 mt-10 pt-6 border-t border-slate-50">
          <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="flex items-center gap-2 px-5 py-2.5 text-rose-600 font-semibold text-sm rounded-xl hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Удалить
          </button>

          <button
              type="button"
              onClick={handleEditMode}
              className="flex items-center gap-2 px-5 py-2.5 text-slate-600 bg-slate-100 font-semibold text-sm rounded-xl hover:bg-slate-200 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Редактировать
          </button>

          {!pathname.includes('/approved') && (
              <button
                  type="button"
                  onClick={publishMarkerHandler}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gold text-navy font-extrabold text-sm rounded-[12px] hover:opacity-90 shadow-lg transition-all active:scale-95"
              >
                <Globe className="w-4 h-4" />
                Опубликовать на карте
              </button>
          )}
        </div>

        <ModalWindow title="Редактирование записи" isOpen={editMode} onClose={handleEditMode}>
          <ViolationEditForm item={item} onClose={handleEditMode}/>
        </ModalWindow>
      </div>
  );
};

export default ViolationCard;