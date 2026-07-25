import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectViolationTypes } from "../../features/violationTypes/violationTypesSlice";
import ViolationListItem from "./ViolationListItem";
import { MarkerBeforeModeratorMutation, MarkerOnMap } from "../../types";
import { apiURL } from "../../utils/constants";
import { Inbox } from "lucide-react";

interface Props {
  markers: MarkerOnMap[] | MarkerBeforeModeratorMutation[];
}

const GmailTabs: React.FC<Props> = ({ markers }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [isOpenId, setIsOpenId] = useState<null | number>(null);
  const tabs = useAppSelector(selectViolationTypes);

  const toggleOpen = (id: number) => {
    setIsOpenId(isOpenId === id ? null : id);
  };

  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0].id.toString());
    }
  }, [tabs, activeTab]);

    const filteredMarkers = (markers as (MarkerOnMap | MarkerBeforeModeratorMutation)[])
        .filter((item) => item.violationTypeId === Number(activeTab))
        .sort((a, b) => a.authorCity.localeCompare(b.authorCity));

  return (
      <div className="w-full">
        <div className="flex items-center gap-2 p-1 bg-cream rounded-[12px] w-fit mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id.toString();
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id.toString())}
                    className={`
                flex items-center gap-2 px-6 py-2.5 transition-all duration-200 whitespace-nowrap
                ${isActive
                        ? 'bg-white text-navy rounded-[8px] shadow-sm border border-lineLight font-semibold'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}
              `}
                >
                  <img
                      className={`w-5 h-5 object-contain transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`}
                      src={`${apiURL}static/uploads/icons/${tab.icon}`}
                      alt={tab.violationType}
                  />
                  <span className="text-sm">{tab.violationType}</span>
                </button>
            );
          })}
        </div>

          <div className="space-y-3">
              {filteredMarkers.length > 0 ? (
                  filteredMarkers.map((item) => (
                      <ViolationListItem
                          key={item.id}
                          item={item} // Здесь TS теперь поймет тип
                          toggleOpen={toggleOpen}
                          isOpenId={isOpenId}
                      />
                  ))
              ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-cream rounded-[16px] border-2 border-dashed border-lineLight">
                <Inbox className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-medium">Заявки в этой категории отсутствуют</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default GmailTabs;