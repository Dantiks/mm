import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectUser } from "../../features/users/usersSlice";
import { logout } from "../../features/users/usersThunks";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { LogOut, LayoutDashboard, User as UserIcon, Menu, X } from "lucide-react";
import MobileSideBar from "../Sidebar/MobileSideBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  // Проверяем, активна ли ссылка для стилизации
  const isActive = (path: string) => location.pathname === path;

  return (
      <header className="sticky top-0 z-[1000] w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">

            {/* Логотип */}
            <Link to="/" className="flex items-center group">
              <img
                  src="/main-logo.png"
                  alt="Logo"
                  className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Правая часть: Навигация и Пользователь */}
            <div className="flex items-center gap-4">

              {/* Десктопное меню для залогиненного пользователя */}
              {user && (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                        to="/admin/main"
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            isActive('/admin/main')
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Панель
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Чыгуу
                    </button>
                  </div>
              )}

              {/* Мобильная кнопка меню (Бургер) */}
              <button
                  onClick={toggleMenu}
                  className="p-2 rounded-xl bg-slate-50 text-slate-600 md:hidden hover:bg-slate-100 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>


        <MobileSideBar isOpen={isOpen} setIsOpen={toggleMenu} />
      </header>
  );
};

export default Header;