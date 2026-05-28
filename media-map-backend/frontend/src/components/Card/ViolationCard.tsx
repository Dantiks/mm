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
import {
  MapPin,
  Link2,
  MessageSquare,
  ShieldAlert,
  Trash2,
  Edit3,
  Globe,
  ExternalLink
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

  return (
      <div
          className="p-6 bg-white rounded-3xl"
          onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Локация</span>
                </div>
                <p className="text-slate-700 font-medium">{item.authorRegion}</p>
                <p className="text-slate-500 text-sm">{item.authorCity}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Link2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Источник</span>
                </div>
                {item.mediaLink ? (
                    <a
                        href={item.mediaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 break-all"
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
                <div className="mt-1 p-2 bg-blue-50 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Комментарий заявителя</span>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    {item.authorComment || 'Комментарий не оставлен'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 p-2 bg-purple-50 rounded-lg">
                  <ShieldAlert className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Заметка модератора</span>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed italic">
                    {item.moderatorComment || 'Нет внутренних пометок'}
                  </p>
                </div>
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
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
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