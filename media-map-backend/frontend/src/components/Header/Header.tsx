import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { selectUser } from "../../features/users/usersSlice";
import { logout } from "../../features/users/usersThunks";
import { LogOut, LayoutDashboard, Menu, X, Search } from "lucide-react";
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
            {/* Кнопка Поиска */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all border border-slate-200"
              title="Поиск по сайту"
            >
              <Search className="h-4 w-4 text-slate-500" />
              <span className="hidden sm:inline">Поиск</span>
            </button>

            <LanguageSwitcher className="hidden md:flex" />

            {user && (
              <div className="hidden items-center gap-2 md:flex">
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
