import React from 'react';
import { MapPin, Image as ImageIcon, Link2, ChevronDown } from "lucide-react";
import ViolationCard from "../Card/ViolationCard";
import { MarkerBeforeModeratorMutation, MarkerOnMap } from "../../types";

interface Props {
  item: MarkerBeforeModeratorMutation | MarkerOnMap;
  toggleOpen: (id: number) => void;
  isOpenId: number | null;
}

const ViolationListItem: React.FC<Props> = ({ item, toggleOpen, isOpenId }) => {
  const isOpen = isOpenId === item.id;

  return (
      <div
          className={`
        group overflow-hidden transition-all duration-300 border
        ${isOpen
              ? 'bg-white border-gold ring-4 ring-slate-200 rounded-[16px]'
              : 'bg-white border-lineLight rounded-[12px] hover:border-gold/50 hover:shadow-md'}
      `}
      >
        <div
            className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleOpen(item.id)}
        >
          <div className="flex flex-1 items-center gap-4 min-w-0">

            <div className="flex items-center justify-center bg-white text-navy font-mono text-[10px] px-2 py-1 rounded-lg border border-lineLight group-hover:bg-slate-50 group-hover:text-navy group-hover:border-lineLight transition-colors">
              #{item.id}
            </div>

            <div className="flex items-center gap-3 min-w-[180px]">
              <div className="p-2 bg-white rounded-lg group-hover:bg-slate-50 transition-colors">
                <MapPin className="w-4 h-4 text-slate-400 group-hover:text-navy" />
              </div>
              <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-slate-700 truncate text-[14px]">
                {item.authorCity}
              </span>
                <span className="text-[11px] text-slate-400 truncate tracking-wide uppercase">
                {item.authorRegion}
              </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-slate-500 min-w-[200px]">
              <Link2 className="w-4 h-4 opacity-40" />
              <span className="text-sm truncate max-w-[150px] italic">
              {item.mediaLink || 'Нет ссылки'}
            </span>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0">
            <div className="flex items-center gap-2">
              {item.image ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-tighter">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Фото
                  </div>
              ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-xs font-medium uppercase tracking-tighter">
                    Нет фото
                  </div>
              )}
            </div>

            <div className={`
            p-1.5 rounded-full transition-all duration-300
            ${isOpen ? 'bg-navy text-white rotate-180' : 'bg-white text-slate-400 group-hover:bg-slate-50'}
          `}>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {isOpen && (
            <div className="border-t border-lineLight bg-white/40 p-2 animate-in slide-in-from-top-2 duration-300">
              <ViolationCard item={item} />
            </div>
        )}
      </div>
  );
};

export default ViolationListItem;