import React, { useEffect, useState } from 'react';
import EditableText from '../../../components/CMS/EditableText';

interface Props {
  message: string;
  isShow: boolean;
  hideAlert: () => void;
}

const CustomAlert: React.FC<Props> = ({ message, isShow, hideAlert }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isShow) {
      setVisible(true);
      // Скрыть элемент через 3 секунды
      const timer = setTimeout(() => {
        setVisible(false);
        hideAlert();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
      <div
          className={`fixed inset-0 z-[2000] transition-opacity duration-500 ${
              visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Затемненная подложка */}
        <div className="absolute inset-0 bg-black bg-opacity-50"/>

        {/* Алерт */}
        <div className="fixed top-5 left-0 right-0 mx-auto max-w-[1200px] w-[90%] bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
          <div className="py-2">
            <p className="font-bold"><EditableText textKey="customAlert.raw1" value="Внимание!" /></p>
            <p>{message}</p>
          </div>
        </div>
      </div>
  );
};

export default CustomAlert;
