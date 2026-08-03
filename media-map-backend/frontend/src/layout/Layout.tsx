import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AiAssistantWidget from "../components/AI/AiAssistantWidget";
import { EditorModeProvider } from '../context/EditorModeContext';
import FloatingEditorBar from '../components/CMS/FloatingEditorBar';

const Layout: React.FC = () => {
  return (
    <EditorModeProvider>
      <div
        className="min-h-dvh flex flex-col relative"
        style={{
          transition: "height 0.2s linear",
        }}
      >
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <AiAssistantWidget />
        <FloatingEditorBar />
      </div>
    </EditorModeProvider>
  );
};

export default Layout;