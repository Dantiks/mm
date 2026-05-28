import React from 'react';
import { Link, useLocation } from "react-router-dom"; // Добавили useLocation
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectUser } from "../../features/users/usersSlice";
import { logout } from "../../features/users/usersThunks";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import {
  Info,
  Map as MapIcon,
  BookOpen,
  Phone,
  LayoutDashboard,
  LogOut,
  X,
  ChevronRight
} from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const MobileSideBar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logout());
    setIsOpen();
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { to: "/about", label: "Долбоор жөнүндө", icon: <Info className="w-5 h-5" /> },
    { to: "/terms", label: "Картаны колдонуу", icon: <MapIcon className="w-5 h-5" /> },
    { to: "/useful", label: "Пайдалуу булактар", icon: <BookOpen className="w-5 h-5" /> },
    { to: "/contacts", label: "Байланыштар", icon: <Phone className="w-5 h-5" /> },
  ];

  return (
      <div>
        {/* Оверлей с мягким размытием */}
        <div
            className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen ? 'opacity-100 z-[1000]' : 'opacity-0 pointer-events-none -z-10'
            }`}
            onClick={setIsOpen}
        />

        {/* Панель сайдбара */}
        <div
            className={`fixed top-0 right-0 h-dvh w-[280px] bg-white z-[1001] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Шапка: лого и кнопка закрытия */}
          <div className="flex items-center justify-between p-5 border-b border-slate-50">
            <img src="/main-logo.png" alt="Logo" className="h-7 w-auto" />
            <button
                onClick={setIsOpen}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Навигация */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                  <li key={item.to}>
                    <Link
                        to={item.to}
                        onClick={setIsOpen}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                            isActive(item.to)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                    <span className={isActive(item.to) ? 'text-blue-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                        {item.label}
                      </div>
                      {isActive(item.to) && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  </li>
              ))}
            </ul>

            {/* Блок для администратора */}
            {user && (
                <div className="mt-6 pt-6 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block mb-3">
                Администратор
              </span>
                  <div className="space-y-1">
                    <Link
                        to="/admin/main"
                        onClick={setIsOpen}
                        className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                            isActive('/admin/main')
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      <LayoutDashboard className={`w-5 h-5 ${isActive('/admin/main') ? 'text-blue-400' : 'text-slate-400'}`} />
                      Панель
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50 transition-colors mt-1"
                    >
                      <LogOut className="w-5 h-5 text-red-400" />
                      Чыгуу
                    </button>
                  </div>
                </div>
            )}
          </nav>

          {/* Нижняя часть */}
          <div className="p-6 border-t border-slate-50 bg-slate-50/50">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
              mediamap.kg • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
  );
};

export default MobileSideBar;