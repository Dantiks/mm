import React, { useEffect, useState } from 'react';
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { createUser, deleteUser, getAllUsers } from "../../features/users/usersThunks";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectAllUsers, selectUser } from "../../features/users/usersSlice";
import { User } from "../../types";
import EditableText from '../../components/CMS/EditableText';
import {
    Users as UsersIcon,
    Trash2,
    ShieldCheck,
    User as UserIcon,
    ShieldAlert,
    Mail,
    UserPlus,
    X,
    Check
} from "lucide-react";

const Users = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectUser);
    const allUsers = useAppSelector(selectAllUsers);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState<'ADMIN' | 'MODERATOR'>('ADMIN');
    const [isCreating, setIsCreating] = useState(false);
    const [createSuccess, setCreateSuccess] = useState('');

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = async (userToDelete: User) => {
        if (currentUser && (currentUser.role === "SUPERADMIN" || currentUser.role === "ADMIN")) {
            if (window.confirm(`Вы уверены, что хотите удалить пользователя ${userToDelete.email}?`)) {
                try {
                    const response = await dispatch(deleteUser(userToDelete.id)).unwrap();
                    window.alert(response.message);
                    dispatch(getAllUsers());
                } catch (e) {
                    window.alert("Ошибка при удалении");
                }
            }
        } else {
            window.alert('У вас недостаточно прав! Требуется роль администратора.');
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail || !newPassword) return;
        setIsCreating(true);
        try {
            await dispatch(createUser({ email: newEmail, password: newPassword, role: newRole, name: newEmail })).unwrap();
            setCreateSuccess(`Пользователь ${newEmail} создан с ролью ${newRole === 'ADMIN' ? 'администратор' : 'модератор'}.`);
            setNewEmail('');
            setNewPassword('');
            dispatch(getAllUsers());
            setTimeout(() => {
                setCreateSuccess('');
                setIsAddModalOpen(false);
            }, 2500);
        } catch (err: any) {
            const status = err?.response?.status;
            window.alert(
                status === 403
                    ? 'Создавать пользователей может только администратор.'
                    : status === 409
                        ? 'Пользователь с таким email уже существует.'
                        : err?.message || 'Не удалось создать пользователя.'
            );
        } finally {
            setIsCreating(false);
        }
    };

    const getRoleBadge = (role: string) => {
        const styles = {
            SUPERADMIN: "bg-rose-100 text-rose-700 border-rose-200",
            ADMIN: "bg-amber-100 text-amber-800 border-amber-300 font-bold",
            MODERATOR: "bg-emerald-100 text-emerald-800 border-emerald-300",
            USER: "bg-slate-100 text-slate-700 border-slate-200",
        };

        const labels = {
            SUPERADMIN: "Super Admin",
            ADMIN: "Администратор №2",
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
        <div className="max-w-6xl font-inter">
            {/* Шапка страницы */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-2">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-navy rounded-2xl shadow-xl">
                        <UsersIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight"><EditableText textKey="users.raw1" value="Пользователи и Администраторы" /></h2>
                        <p className="text-sm text-slate-500 font-medium"><EditableText textKey="users.raw2" value="Управление доступом второго администратора (мамы) и модераторов" /></p>
                    </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-red-700 transition-all"
                    >
                        <UserPlus className="w-4 h-4" />
                        + 2-й администратор
                    </button>
                </div>
            </div>

            {/* Таблица */}
            <div className="bg-white border border-lineLight rounded-[16px] shadow-sm overflow-hidden">
                <table className="min-w-full border-collapse text-left">
                    <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Email пользователя</th>
                        <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]"><EditableText textKey="users.raw3" value="Уровень доступа" /></th>
                        <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] text-right"><EditableText textKey="users.raw4" value="Действия" /></th>
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
                                    <span className="hidden sm:inline"><EditableText textKey="users.raw5" value="Удалить" /></span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно добавления второго администратора */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-fadeIn">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-red-600" />
                                <EditableText textKey="users.raw6" value="Назначить 2-го администратора" />
                            </h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateAdmin} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Email администратора</label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="admin2@mediamap.kg"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-navy outline-none focus:border-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1"><EditableText textKey="users.raw7" value="Пароль" /></label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-navy outline-none focus:border-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1"><EditableText textKey="users.raw8" value="Роль доступа" /></label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value as 'ADMIN' | 'MODERATOR')}
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-navy outline-none focus:border-red-500"
                                >
                                    <option value="ADMIN">{"Администратор (Полный доступ)"}</option>
                                    <option value="MODERATOR">{"Модератор (Проверка заявок)"}</option>
                                </select>
                            </div>

                            {createSuccess && (
                                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-200">
                                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>{createSuccess}</span>
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100"
                                >
                                    <EditableText textKey="users.raw11" value="Отмена" />
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-700 shadow-md"
                                >
                                    {isCreating ? 'Создание...' : 'Создать учетную запись'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;