import React from 'react';
import { useLocation } from "react-router-dom";
import { Menu, Bell, Search, ChevronRight } from "lucide-react";

interface Props {
    setSidebarOpen: (state: boolean) => void;
}

const AdminPanelHeader: React.FC<Props> = ({ setSidebarOpen }) => {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/admin/main': return 'Не обработанные';
            case '/admin/approved': return 'Опубликованные';
            case '/admin/violation-types': return 'Виды нарушений';
            case '/admin/users': return 'Пользователи';
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
                        <span>Админ</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-goldDeep">Панель</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-800 leading-tight">
                        {getTitle()}
                    </h1>
                </div>
            </div>

            {/* Правая часть: Поиск и Уведомления (для солидности) */}
            <div className="flex items-center gap-3">
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
                        <p className="text-sm font-semibold text-slate-700">Администратор</p>
                        <p className="text-[11px] text-slate-400 font-medium">Главный модератор</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-white font-bold shadow-md">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminPanelHeader;