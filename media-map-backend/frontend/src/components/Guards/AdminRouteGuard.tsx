import React from 'react';
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectUser} from "../../features/users/usersSlice";
import Auth from "../../pages/Auth";

const AdminRouteGuard = () => {
    const user = useAppSelector(selectUser); // Достаем пользователя из стора
    const rolesList = ['ADMIN', 'MODERATOR'];
    if (!user || !rolesList.includes(user.role)) {
        return <Auth />
    }

    return <Outlet />;
};

export default AdminRouteGuard;