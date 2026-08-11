import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Bell, Search, ChevronRight, Sparkles, LogOut } from "lucide-react";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { selectUser } from "../../features/users/usersSlice";
import { logout } from "../../features/users/usersThunks";
import { canEditSiteContent } from "../../utils/roles";
import EditableText from '../../components/CMS/EditableText';

interface Props {
    setSidebarOpen: (state: boolean) => void;
}

const ROLE_LABELS: Record<string, string> = {
    SUPERADMIN: 'Суперадминистратор',
    ADMIN: 'Администратор',
    MODERATOR: 'Модератор',
};

const AdminPanelHeader: React.FC<Props> = ({ setSidebarOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Раньше здесь было захардкожено «Администратор / Главный модератор / A»
    // независимо от того, кто вошёл.
    const role = (user?.role || '').toUpperCase();
    const displayName = user?.name || user?.email || 'Пользователь';
    const roleLabel = ROLE_LABELS[role] || role || 'Без роли';
    const initial = displayName.trim().charAt(0).toUpperCase() || '?';

    const handleEnableLiveEdit = () => {
        // ?edit=1 включает режим редактора. Прежний флаг adminEditorMode
        // в localStorage мог поставить кто угодно через devtools.
        navigate('/?edit=1');
    };

    const handleLogout = async () => {
        if (isLoggingOut) return;
        if (!window.confirm('Выйти из аккаунта?')) return;

        setIsLoggingOut(true);
        try {
            await dispatch(logout()).unwrap();
        } catch (e) {
            // Локальную сессию сбрасываем в любом случае.
        } finally {
            setIsLoggingOut(false);
            navigate('/');
        }
    };

    const getTitle = () => {
        switch (location.pathname) {
            case '/admin/main': return 'Не обработанные';
            case '/admin/approved': return 'Опубликованные';
            case '/admin/violation-types': return 'Виды нарушений';
            case '/admin/users': return 'Пользователи';
            case '/admin/texts': return 'Тексты сайта (CMS)';
            default: return 'Панель управления';
        }
    };

    return (
        <header className="h-20 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 sticky top-0 z-20 border-b border-slate-100">
            <div className="flex items-center gap-4">
                {/* Кнопка меню для мобилок */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-xl bg-slate-50 text-slate-600 lg:hidden hover:bg-slate-100 transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Хлебные крошки / Заголовок */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                        <span><EditableText textKey="adminPanelHeader.raw1" value="Админ" /></span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-goldDeep"><EditableText textKey="adminPanelHeader.raw2" value="Панель" /></span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-800 leading-tight">
                        {getTitle()}
                    </h1>
                </div>
            </div>

            {/* Правая часть: Поиск, Живое редактирование и Профиль */}
            <div className="flex items-center gap-3">
                {canEditSiteContent(user?.role) && (
                    <button
                        onClick={handleEnableLiveEdit}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md shadow-red-500/20 transition-all cursor-pointer group"
                        title="Зайти на сайт и редактировать любые тексты прямо на экране"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                        <span className="hidden sm:inline"><EditableText textKey="adminPanelHeader.raw3" value="Редактировать сайт визуально" /></span>
                        <span className="sm:hidden"><EditableText textKey="adminPanelHeader.raw4" value="Редактор" /></span>
                    </button>
                )}

                <button className="hidden md:flex p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                    <Search className="w-5 h-5" />
                </button>
                <button className="relative p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>
                <div className="flex items-center gap-3 pl-2">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-semibold text-slate-700 max-w-[180px] truncate" title={displayName}>
                            {displayName}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">{roleLabel}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-white font-bold shadow-md">
                        {initial}
                    </div>

                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        title="Выйти из аккаунта"
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all cursor-pointer disabled:opacity-60"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden lg:inline text-xs font-bold">
                            {isLoggingOut ? 'Выходим…' : 'Выйти'}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminPanelHeader;