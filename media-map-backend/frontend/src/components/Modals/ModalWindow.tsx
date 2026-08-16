import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ModalWindow: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="md:max-h-[90%] bg-white rounded-[16px] shadow-lg md:max-w-[80%] font-inter h-full w-full flex flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="text-[18px] font-extrabold text-navy">{title || ""}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-navy focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
        <div className="border-t p-4 flex items-center justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-navy text-white font-bold rounded-[12px] hover:bg-navyCard transition-colors focus:outline-none"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;