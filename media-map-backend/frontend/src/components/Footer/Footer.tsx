import React from 'react';
import {Link} from "react-router-dom";
import {FOOTER_HEIGHT} from "../../utils/constants";

const Footer = () => {
  const logoStyle = 'h-7 md:h-10 drop-shadow-md rounded bg-white mb-1'
  return (
    <footer className={`py-4 px-2 md:px-8 text-white bg-mainTheme h-[${FOOTER_HEIGHT}]`}>
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col justify-center items-center text-sm">
          <div className="hidden md:block flex space-x-3 pb-3">
            <Link to="/about" className="hover:underline">Долбоор жөнүндө</Link>
            <Link to="/terms" className="hover:underline"> Картаны кантип колдонуу керек?</Link>
            <Link to="/useful" className="hover:underline"> Пайдалуу булактар</Link>
            <Link to="/contacts" className="hover:underline"> Байланыш маалыматтары</Link>
          </div>
          <div className="max-w-[280px] md:max-w-none flex flex-wrap md:flex-row items-center justify-center space-x-2">
            <a href="https://www.eeas.europa.eu/delegations/kyrgyz-republic_ru" target="_blank" className="hover:text-blue-300" rel="noreferrer">
              <img src="/eu-horiz-logo.png" alt="Logo" className={`${logoStyle} w-45 md:w-60`}/>
            </a>
            <a href="https://mediaconsult.kg/" target="_blank" className="text-blue-500 hover:text-blue-300" rel="noreferrer">
              <img src="/media-consult-logo.png" alt="Logo" className={`${logoStyle} w-25 md:w-35`}/>
            </a>
            <a href="https://kyrgyzmedia.kg/" target="_blank" className="hover:text-blue-300" rel="noreferrer">
              <img src="/assoc-logo.png" alt="Logo" className={`${logoStyle} w-10 md:w-12`}/>
            </a>
            <a href="https://internews.kg/" target="_blank" className="hover:text-blue-300" rel="noreferrer">
              <img src="/internews-2-logo.jpg" alt="Logo" className={`${logoStyle} w-25 md:w-35`}/>
            </a>
          </div>
        </div>
        <p className="text-[9px] md:text-[10px] text-center max-w-[470px] md:max-w-none mx-auto pt-1">
          © МедиаКонсалт фонду. Бардык укуктар корголгон. Материалдарды пайдалануу редакциянын макулдугу менен гана уруксат берилет.
        </p>
      </div>
    </footer>
  );
};

export default Footer;