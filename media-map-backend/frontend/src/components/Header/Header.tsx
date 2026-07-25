import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectUser } from "../../features/users/usersSlice";
import { logout } from "../../features/users/usersThunks";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import MobileSideBar from "../Sidebar/MobileSideBar";

const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'О нас', to: '/about' },
  { label: 'Категории нарушений', to: '/categories' },
  { label: 'Ресурсы', to: '/useful' },
  { label: 'Контакты', to: '/contacts' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
      <header className="sticky top-0 z-[1000] w-full border-b border-lineLight bg-white/90 backdrop-blur-md font-inter">
        <div className="mx-auto max-w-[1792px] px-4 sm:px-6 lg:px-16">
          <div className="flex h-16 items-center justify-between md:h-[71px]">

            {/* Логотип */}
            <Link to="/" className="group flex items-center">
              <img
                  src="/media-map-logo.png"
                  alt="mediamap.kg"
                  className="h-8 w-auto transition-transform group-hover:scale-105 md:h-10"
              />
            </Link>

            {/* Десктопная навигация */}
            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                        `text-[15px] transition-colors hover:text-navy ${
                            isActive
                                ? 'font-bold text-navy border-b-2 border-gold pb-1'
                                : 'font-medium text-[#3e494a]'
                        }`
                    }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Правая часть: Пользователь и мобильное меню */}
            <div className="flex items-center gap-3">
              {user && (
                  <div className="hidden items-center gap-2 md:flex">
                    <Link
                        to="/admin/main"
                        className="flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-bold text-white transition-all hover:bg-navyCard"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Панель
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Выйти
                    </button>
                  </div>
              )}

              {/* Мобильная кнопка меню (Бургер) */}
              <button
                  onClick={toggleMenu}
                  className="rounded-xl bg-slate-50 p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
                  aria-label="Меню"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <MobileSideBar isOpen={isOpen} setIsOpen={toggleMenu} />
      </header>
  );
};

export default Header;
