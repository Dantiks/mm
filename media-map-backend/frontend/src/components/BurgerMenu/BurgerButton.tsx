import React from 'react';

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

const BurgerButton: React.FC<Props> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className="relative w-10 h-10 flex flex-col justify-center items-center group z-[9999]"
      onClick={toggleMenu}
    >
        <span
          className={`block w-8 h-1 bg-darkBlue rounded transition-transform duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>

      <span
        className={`block w-8 h-1 mt-1 mb-1 bg-darkBlue rounded transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : ''
        }`}
      ></span>

      <span
        className={`block w-8 h-1 bg-darkBlue rounded transition-transform duration-300 ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      ></span>
    </button>
  );
};

export default BurgerButton;