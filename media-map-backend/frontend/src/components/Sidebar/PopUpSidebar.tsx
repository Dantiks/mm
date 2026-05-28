import React, {useEffect} from 'react';
import {MarkerOnMap} from "../../types";
import {apiURL} from "../../utils/constants";

interface PopUpSidebarProps {
  marker: MarkerOnMap | null;
  onClose: () => void;
}

const PopUpSidebar: React.FC<PopUpSidebarProps> = ({ marker, onClose }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false); // Состояние для отслеживания закрытия

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300);
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-300/60 z-[9998] flex transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-4/5 max-w-lg bg-white shadow-lg overflow-y-auto max-h-screen transition-all duration-300 ease-in-out transform ${
          isVisible && !isClosing ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center bg-mainTheme justify-between py-3.5 px-5">
          <h2 className="text-lg font-semibold text-white">Бузуунун чоо-жайы</h2>
          <button
            onClick={handleClose}
            className="text-[30px] text-white hover:text-red-500 focus:outline-none"
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        <div className="px-2 md:px-10 py-4 space-y-3">
          <p className="text-gray-700"><strong>Бузуунун түрү:</strong> {marker?.violationType.violationType}</p>
          <p className="text-gray-700"><strong>Аймак:</strong> {marker?.authorRegion}</p>
          <p className="text-gray-700"><strong>Шаары:</strong> {marker?.authorCity}</p>
        </div>

        <div className="px-2 md:px-10 py-4 space-y-3 border-t border-gray-200">
          <p className="text-gray-700"><strong>Медиа шилтеме:</strong>
            <a href={marker?.mediaLink} className="text-blue-500 ml-[7px] hover:text-burgundy" target="_blank"
               rel="noopener noreferrer">
              Медиаресурска өтүү
            </a>
          </p>
          {marker?.image && (
            <div className="flex flex-col space-y-3">
              <p className="text-gray-700"><strong>Скриншот:</strong></p>
              <img
                src={`${apiURL}static/uploads/screenshots/${marker?.image}`}
                alt="marker-screenshot"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>

        <div className="px-2 md:px-10 py-4  space-y-3 border-t border-gray-200">
          <p className="text-gray-700"><strong>Колдонуучунун комментарийи:</strong></p>
          {/*<p className="text-gray-700">{marker?.authorComment || "Комментарий не оставлен"}</p>*/}
          <p className="text-gray-700">
            {marker?.authorComment
              ? marker.authorComment.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))
              : "Комментарий жок"}
          </p>
        </div>

        <div className="px-2 md:px-10 py-4  space-y-3 border-t border-gray-200">
          <p className="text-gray-700"><strong>Эксперттин комментарийи:</strong></p>
          {/*<p className="text-gray-700">{marker?.moderatorComment || "Комментарий не оставлен"}</p>*/}
          <p className="text-gray-700">
            {marker?.moderatorComment
              ? marker.moderatorComment.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))
              : "Комментарий жок"}
          </p>
        </div>

        <div className="p-5 mb-22 border-t border-gray-200 flex items-center justify-center">
          <button
            onClick={handleClose}
            className="bg-mainTheme text-white py-2 px-6 rounded-lg text-lg hover:bg-opacity-70 focus:outline-none"
          >
            Жабуу
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpSidebar;
