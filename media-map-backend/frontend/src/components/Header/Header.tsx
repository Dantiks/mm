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

import EditableText from "../CMS/EditableText";
import { canEditSiteContent } from "../../utils/roles";
import EditableImage from '../../components/CMS/EditableImage';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { t } = useLanguage();

  const navItems = [
    { key: 'nav.home', label: t.nav.home, to: '/' },
    { key: 'nav.about', label: t.nav.about, to: '/about' },
    { key: 'nav.categories', label: t.nav.categories, to: '/categories' },
    { key: 'nav.analytics', label: 'Аналитика', to: '/analytics' },
    { key: 'nav.resources', label: t.nav.resources, to: '/useful' },
    { key: 'nav.news', label: t.nav.news, to: '/news' },
    { key: 'nav.contacts', label: t.nav.contacts, to: '/contacts' },
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
            <EditableImage
              imageKey="images.logo"
              fallbackSrc="/media-map-logo.jpg"
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
                <EditableText textKey={item.key} value={item.label} />
              </NavLink>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            {/* Поиск. Кнопка круглая и размера не меняет: раньше она
                разъезжалась с 40 до 240 пикселей и толкала соседние
                элементы шапки. Реакция на наведение осталась — фон,
                рамка и цвет иконки. Подпись ушла в title. */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              title="Поиск по сайту"
              aria-label="Поиск по сайту"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200/90 text-slate-600 transition-colors duration-200 hover:bg-white hover:border-red-500/80 hover:text-red-600 hover:shadow-md cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </button>

            <LanguageSwitcher className="hidden md:flex" />

            {user && (
              <div className="hidden items-center gap-2 md:flex">
                {canEditSiteContent(user.role) && (
                  <Link
                    to="/admin/texts"
                    className="flex items-center gap-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 px-3 py-2 text-xs font-extrabold transition-all hover:bg-red-600 hover:text-white shadow-xs"
                    title="Визуальное редактирование текстов сайта"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span><EditableText textKey="header.raw4" value="Редактор сайта" /></span>
                  </Link>
                )}

                <Link
                  to="/admin/main"
                  className="flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white transition-all hover:bg-navyCard shadow-xs"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <EditableText textKey="nav.panel" value={t.nav.panel} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-500 transition-all hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <EditableText textKey="nav.logout" value={t.nav.logout} />
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
