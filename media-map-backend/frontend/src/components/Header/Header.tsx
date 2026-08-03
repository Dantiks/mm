import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { selectUser } from "../../features/users/usersSlice";
import { logout } from "../../features/users/usersThunks";
import { LogOut, LayoutDashboard, Menu, X, Search, Edit3 } from "lucide-react";
import MobileSideBar from "../Sidebar/MobileSideBar";
import { useLanguage } from "../../i18n/LanguageContext";
import LanguageSwitcher from "../../i18n/LanguageSwitcher";
import SiteSearchModal from "../Search/SiteSearchModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.about, to: '/about' },
    { label: t.nav.categories, to: '/categories' },
    { label: 'Аналитика', to: '/analytics' },
    { label: t.nav.resources, to: '/useful' },
    { label: t.nav.news, to: '/news' },
    { label: t.nav.contacts, to: '/contacts' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-lineLight bg-white/95 backdrop-blur-md font-inter transition-colors duration-300">
      <div className="mx-auto max-w-[1792px] px-4 sm:px-6 lg:px-16">
        <div className="flex h-[72px] items-center justify-between">

          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/media-map-logo.jpg"
              alt="MediaMap"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-[14px] transition-colors hover:text-navy ${
                    isActive
                      ? 'font-extrabold text-navy border-b-2 border-red-600 pb-1'
                      : 'font-medium text-[#3e494a]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            {/* Интерактивный поиск по лупе наведение */}
            <div className="relative flex items-center group">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center rounded-full bg-slate-100 p-1 border border-slate-200/90 transition-all duration-500 ease-out group-hover:w-60 w-10 overflow-hidden group-hover:bg-white group-hover:shadow-md group-hover:border-red-500/80 cursor-pointer"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-600 group-hover:text-red-600 transition-colors">
                  <Search className="h-4 w-4" />
                </div>
                <span className="whitespace-nowrap text-xs font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-3 select-none">
                  Поиск по сайту...
                </span>
              </div>
            </div>

            <LanguageSwitcher className="hidden md:flex" />

            {user && (
              <div className="hidden items-center gap-2 md:flex">
                {user.role === 'admin' && (
                  <Link
                    to="/admin/texts"
                    className="flex items-center gap-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 px-3 py-2 text-xs font-extrabold transition-all hover:bg-red-600 hover:text-white shadow-xs"
                    title="Визуальное редактирование текстов сайта"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Редактор сайта</span>
                  </Link>
                )}

                <Link
                  to="/admin/main"
                  className="flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white transition-all hover:bg-navyCard shadow-xs"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {t.nav.panel}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-500 transition-all hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  {t.nav.logout}
                </button>
              </div>
            )}

            {/* Мобильное меню */}
            <button
              onClick={toggleMenu}
              className="rounded-xl bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200 lg:hidden"
              aria-label={t.nav.menu}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <SiteSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileSideBar isOpen={isOpen} setIsOpen={toggleMenu} />
    </header>
  );
};

export default Header;
