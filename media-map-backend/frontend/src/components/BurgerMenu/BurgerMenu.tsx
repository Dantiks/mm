import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Bars4Icon, XMarkIcon} from "@heroicons/react/24/outline";

interface Props {
  children: ReactNode;
  styleProp: string;
}

const BurgerMenu: React.FC<Props> = ({children, styleProp}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`w-10 h-10 p-2 ${styleProp}`}
        onClick={toggleMenu}
      >
        <Bars4Icon className="bg-transparent text-darkBlue drop-shadow-md"/>
      </button>

      {isOpen && (
        <div
          className="absolute right-3 mt-3 w-[250px] bg-white shadow-lg rounded-lg p-4 z-[9999]"
        >
          <button
            className="absolute top-2 right-2 text-black focus:outline-none"
            onClick={toggleMenu}
          >
            <XMarkIcon className="text-burgundy w-4 h-4"/>
          </button>
          <ul className="space-y-2 text-black">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;