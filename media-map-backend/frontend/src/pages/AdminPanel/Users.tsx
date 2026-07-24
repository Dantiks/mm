import React, { useEffect } from 'react';
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { deleteUser, getAllUsers } from "../../features/users/usersThunks";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectAllUsers, selectUser } from "../../features/users/usersSlice";
import { User } from "../../types";
import {
    Users as UsersIcon,
    Trash2,
    ShieldCheck,
    User as UserIcon,
    ShieldAlert,
    Mail
} from "lucide-react";

const Users = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectUser);
    const allUsers = useAppSelector(selectAllUsers);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = async (userToDelete: User) => {
        if (currentUser && currentUser.role === "SUPERADMIN") {
            if (window.confirm(`Вы уверены, что хотите удалить пользователя ${userToDelete.email}?`)) {
                try {
                    const response = await dispatch(deleteUser(userToDelete.id)).unwrap();
                    window.alert(response.message);
                } catch (e) {
                    window.alert("Ошибка при удалении");
                }
            }
        } else {
            window.alert('У вас недостаточно прав! Требуется роль SUPERADMIN.');
        }
    };

    const getRoleBadge = (role: string) => {
        const styles = {
            SUPERADMIN: "bg-rose-100 text-rose-700 border-rose-200",
            ADMIN: "bg-creamPill text-goldDeep border-lineLight",
            MODERATOR: "bg-amber-100 text-amber-700 border-amber-200",
            USER: "bg-slate-100 text-slate-700 border-slate-200",
        };

        const labels = {
            SUPERADMIN: "Super Admin",
            ADMIN: "Администратор",
            MODERATOR: "Модератор",
            USER: "Пользователь",
        };

        const Icon = {
            SUPERADMIN: ShieldAlert,
            ADMIN: ShieldCheck,
            MODERATOR: ShieldCheck,
            USER: UserIcon,
        }[role] || UserIcon;

        return (
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${styles[role as keyof typeof styles] || styles.USER}`}>
                <Icon className="w-3.5 h-3.5" />
                {labels[role as keyof typeof labels] || "Неизвестно"}
            </span>
        );
    };

    return (
        <div className="max-w-6xl">
            {/* Шапка страницы */}
            <div className="flex items-center justify-between mb-8 p-2">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-navy rounded-2xl shadow-xl">
                        <UsersIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Пользователи</h2>
                        <p className="text-sm text-slate-500 font-medium">Управление доступом и ролями системы</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <span className="bg-white border border-slate-100 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 shadow-sm">
                        Всего: {allUsers.length}
                    </span>
                </div>
            </div>

            {/* Таблица */}
            <div className="bg-white border border-lineLight rounded-[16px] shadow-sm overflow-hidden">
                <table className="min-w-full border-collapse text-left">
                    <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Email пользователя</th>
                        <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Уровень доступа</th>
                        <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] text-right">Действия</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {allUsers.map((userItem) => (
                        <tr
                            key={userItem.id}
                            className="group hover:bg-slate-50/80 transition-colors duration-200"
                        >
                            <td className="py-5 px-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-navy transition-all border border-transparent group-hover:border-lineLight">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-slate-700">{userItem.email}</span>
                                    {currentUser?.id === userItem.id && (
                                        <span className="text-[10px] bg-cream text-goldDeep px-1.5 py-0.5 rounded-md font-bold uppercase">Вы</span>
                                    )}
                                </div>
                            </td>
                            <td className="py-5 px-6">
                                {getRoleBadge(userItem.role)}
                            </td>
                            <td className="py-5 px-6 text-right">
                                <button
                                    type="button"
                                    disabled={userItem.role === "SUPERADMIN"}
                                    className={`
                                            inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all
                                            ${userItem.role === "SUPERADMIN"
                                        ? 'opacity-20 cursor-not-allowed text-slate-400'
                                        : 'text-rose-500 hover:bg-rose-50 active:scale-95'}
                                        `}
                                    onClick={() => handleDelete(userItem)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">Удалить</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {allUsers.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
                            <UsersIcon className="w-8 h-8 text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-medium">Список пользователей пуст</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;