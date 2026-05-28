import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import AdminPanelSidebar from "../components/Sidebar/AdminPanelSidebar";
import AdminPanelHeader from "../components/Header/AdminPanelHeader";

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
            <AdminPanelSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <AdminPanelHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto ">
                    <div className="bg-white min-h-full shadow-sm border border-slate-100 p-3">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;