import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AiAssistantWidget from "../components/AI/AiAssistantWidget";
import OwlQuoteWidget from '../components/UI/OwlQuoteWidget';
import ViolationCategoriesSidebar from '../components/UI/ViolationCategoriesSidebar';

const Layout: React.FC = () => {
  return (
    <div
      className="min-h-dvh flex flex-col relative"
      style={{
        transition: "height 0.2s linear",
      }}
    >
      <Header />
      <ViolationCategoriesSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <OwlQuoteWidget />
      <Footer />
      <AiAssistantWidget />
    </div>
  );
};

export default Layout;