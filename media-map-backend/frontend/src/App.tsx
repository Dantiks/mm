import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import Auth from "./pages/Auth";
import NewReport from "./pages/NewReport";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Terms from "./pages/Terms";
import Useful from "./pages/Useful";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import AdminLayout from "./layout/AdminLayout";
import Main from "./pages/AdminPanel/Main";
import ApprovedViolations from "./pages/AdminPanel/ApprovedViolations";
import Violations from "./pages/AdminPanel/Violations";
import Users from "./pages/AdminPanel/Users";
import AdminRouteGuard from "./components/Guards/AdminRouteGuard";

function App() {
    return (
        <div className="min-h-screen bg-white relative">
            <Routes>
                <Route element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/sign-up" element={<Auth/>}/>
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/new-report" element={<NewReport/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/useful" element={<Useful/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Route>
                <Route element={<AdminRouteGuard />}>
                    <Route element={<AdminLayout/>}>
                        <Route path="/admin" element={<Navigate to="/admin/main" replace/>}/>
                        <Route path="/admin/main" element={<Main/>}/>
                        <Route path="/admin/approved" element={<ApprovedViolations/>}/>
                        <Route path="/admin/violation-types" element={<Violations/>}/>
                        <Route path="/admin/users" element={<Users/>}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;