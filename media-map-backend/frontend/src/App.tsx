import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import Auth from "./pages/Auth";
import NewReport from "./pages/NewReport";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NewsAggregator from "./pages/News";
import Terms from "./pages/Terms";
import Useful from "./pages/Useful";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Home from "./pages/Home";
import MapPage from "./pages/Map";
import AdminLayout from "./layout/AdminLayout";
import 'leaflet/dist/leaflet.css';
import Main from "./pages/AdminPanel/Main";
import NewsManagement from "./pages/AdminPanel/NewsManagement";
import ApprovedViolations from "./pages/AdminPanel/ApprovedViolations";
import Violations from "./pages/AdminPanel/Violations";
import Users from "./pages/AdminPanel/Users";
import AdminRouteGuard from "./components/Guards/AdminRouteGuard";
import { ThemeProvider } from "./context/ThemeContext";
import SiteTextsManagement from "./pages/AdminPanel/SiteTextsManagement";

import Analytics from "./pages/Analytics";

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-white relative">
                <Routes>
                    <Route element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/sign-up" element={<Auth/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                        <Route path="/categories/:categoryId" element={<CategoryDetail/>}/>
                        <Route path="/analytics" element={<Analytics/>}/>
                        <Route path="/new-report" element={<NewReport/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/terms" element={<Terms/>}/>
                        <Route path="/useful" element={<Useful/>}/>
                        <Route path="/news" element={<NewsAggregator/>}/>
                        <Route path="/map" element={<MapPage/>}/>
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
                            <Route path="/admin/news" element={<NewsManagement/>}/>
                            <Route path="/admin/texts" element={<SiteTextsManagement/>}/>
                        </Route>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;