import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectViolationTypes } from "../../features/violationTypes/violationTypesSlice";
import ViolationListItem from "./ViolationListItem";
import { MarkerBeforeModeratorMutation, MarkerOnMap } from "../../types";
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

  const getTabIconPath = (tab: { id: number; violationType: string; icon?: string }) => {
    const name = (tab.violationType || '').toLowerCase();
    if (name.includes('вражд') || name.includes('жек көрүү') || name.includes('hate')) return '/uploads/icons/hate.png';
    if (name.includes('дезинформ') || name.includes('фейк') || name.includes('жалган')) return '/uploads/icons/fake.png';
    if (name.includes('пропаганд') || name.includes('шылуун')) return '/uploads/icons/propaganda.png';
    if (tab.id === 2) return '/uploads/icons/fake.png';
    if (tab.id === 3) return '/uploads/icons/propaganda.png';
    if (tab.id === 4) return '/uploads/icons/other.png';
    return '/uploads/icons/other.png';
  };

  return (
      <div className="w-full">
        <div className="flex items-center gap-2 p-1 bg-cream rounded-[12px] w-fit mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id.toString();
            const iconSrc = getTabIconPath(tab);
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
                      className={`w-5 h-5 object-contain transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}
                      src={iconSrc}
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