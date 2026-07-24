import React from 'react';
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle2,
  AlertOctagon,
  Users,
  LogOut,
  ChevronRight
} from "lucide-react";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
}

const navItems = [
  { to: "/admin/main", label: "Не обработанные", icon: LayoutDashboard },
  { to: "/admin/approved", label: "Опубликованные", icon: CheckCircle2 },
  { to: "/admin/violation-types", label: "Виды нарушений", icon: AlertOctagon },
  { to: "/admin/users", label: "Пользователи", icon: Users },
];

const AdminPanelSidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
      <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 p-6 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-sm`}
      >
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="bg-navy p-2 rounded-xl shadow-lg">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-slate-800 text-xl font-bold tracking-tight">
            MEDIA <span className="text-goldDeep">MAP</span>
          </h1>
        </div>

        <nav className="space-y-2">
          <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
            Меню управления
          </p>

          {navItems.map((item) => (
              <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
              group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                      ? 'bg-cream text-navy shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
            `}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${sidebarOpen ? 'animate-in fade-in zoom-in' : ''}`} strokeWidth={2.2} />
                  <span className="font-medium text-[15px]">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 opacity-0 transition-opacity group-hover:opacity-100`} />
              </NavLink>
          ))}

          <div className="pt-8 mt-8 border-t border-slate-50">
            <NavLink
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" strokeWidth={2.2} />
              <span className="font-medium text-[15px]">Выйти из панели</span>
            </NavLink>
          </div>
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="bg-navy rounded-xl p-4 text-white overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-xs text-slate-400">Система готова</p>
              <p className="text-[13px] font-medium">Обновлений нет</p>
            </div>
            <div className="absolute -right-2 -bottom-2 bg-navyCard w-12 h-12 rounded-full blur-xl opacity-50" />
          </div>
        </div>
      </aside>
  );
};

export default AdminPanelSidebar;