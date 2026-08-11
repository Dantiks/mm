import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle2,
  AlertOctagon,
  Users,
  LogOut,
  ChevronRight,
  Newspaper,
  FileText,
  Sparkles,
  Home,
} from "lucide-react";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { logout } from "../../features/users/usersThunks";
import EditableAuto from '../../components/CMS/EditableAuto';
import EditableText from '../../components/CMS/EditableText';

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
}

const navItems = [
  { to: "/admin/main", label: "Не обработанные", icon: LayoutDashboard },
  { to: "/admin/approved", label: "Опубликованные", icon: CheckCircle2 },
  { to: "/admin/violation-types", label: "Виды нарушений", icon: AlertOctagon },
  { to: "/admin/news", label: "Новости", icon: Newspaper },
  { to: "/admin/texts", label: "Тексты сайта (CMS)", icon: FileText },
  { to: "/admin/users", label: "Пользователи", icon: Users },
];

const AdminPanelSidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleStartLiveEdit = () => {
    setSidebarOpen(false);
    // ?edit=1 включает режим редактора на сайте. Прежний флаг в localStorage
    // не годился: его мог поставить кто угодно через devtools.
    navigate('/?edit=1');
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    if (!window.confirm('Выйти из аккаунта?')) return;

    setIsLoggingOut(true);
    try {
      await dispatch(logout()).unwrap();
    } catch (e) {
      // Даже если запрос не прошёл, локальную сессию сбрасываем —
      // иначе пользователь остаётся «залогинен» без возможности выйти.
    } finally {
      setIsLoggingOut(false);
      setSidebarOpen(false);
      navigate('/');
    }
  };

  return (
      <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 p-6 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-sm`}
      >
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="bg-navy p-2 rounded-xl shadow-lg">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-slate-800 text-xl font-bold tracking-tight">
            MEDIA <span className="text-goldDeep">MAP</span>
          </h1>
        </div>

        <nav className="space-y-2">
          <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            <EditableText textKey="adminPanelSidebar.raw1" value="Меню управления" />
          </p>

          <button
            onClick={handleStartLiveEdit}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/20 hover:opacity-95 transition-all cursor-pointer group mb-4"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span className="font-black text-[14px]"><EditableText textKey="adminPanelSidebar.raw2" value="Редактор сайта live" /></span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-80" />
          </button>

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
                  <span className="font-medium text-[15px]"><EditableAuto ns="adminPanelSidebar.item.label" value={item.label} /></span>
                </div>
                <ChevronRight className={`w-4 h-4 opacity-0 transition-opacity group-hover:opacity-100`} />
              </NavLink>
          ))}

          {/* Раньше здесь был один пункт «Выйти из панели» — обычная ссылка
              на главную, которая сессию не завершала. Разделено на два
              действия: уход на сайт и настоящий выход. */}
          <div className="pt-8 mt-8 border-t border-slate-50 space-y-1">
            <NavLink
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors duration-200"
            >
              <Home className="w-5 h-5" strokeWidth={2.2} />
              <span className="font-medium text-[15px]"><EditableText textKey="adminPanelSidebar.raw3" value="Вернуться на сайт" /></span>
            </NavLink>

            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors duration-200 cursor-pointer disabled:opacity-60"
            >
              <LogOut className="w-5 h-5" strokeWidth={2.2} />
              <span className="font-medium text-[15px]">
                {isLoggingOut ? 'Выходим…' : 'Выйти из аккаунта'}
              </span>
            </button>
          </div>
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="bg-navy rounded-xl p-4 text-white overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-xs text-slate-400"><EditableText textKey="adminPanelSidebar.raw4" value="Система готова" /></p>
              <p className="text-[13px] font-medium"><EditableText textKey="adminPanelSidebar.raw5" value="Обновлений нет" /></p>
            </div>
            <div className="absolute -right-2 -bottom-2 bg-navyCard w-12 h-12 rounded-full blur-xl opacity-50" />
          </div>
        </div>
      </aside>
  );
};

export default AdminPanelSidebar;