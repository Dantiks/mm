import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout: React.FC = () => {

  return (
    <div
      className="min-h-dvh max-h-dvh flex flex-col relative"
      style={{
        transition: "height 0.2s linear",
      }}
    >
      <Header/>
      <main className="flex-1">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;