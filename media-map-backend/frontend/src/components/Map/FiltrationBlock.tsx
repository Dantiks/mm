import React from 'react';
import {ViolationTypeMutation} from "../../types";
import {apiURL} from "../../utils/constants";
import {Link} from "react-router-dom";

interface Props {
  violationTypes: ViolationTypeMutation[];
  selectedOptions: ViolationTypeMutation[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, item: ViolationTypeMutation) => void;
  isFilterVisible: boolean;
  toggleFilterVisibility: () => void;
}


const FiltrationBlock: React.FC<Props> = ({
                                            violationTypes,
                                            selectedOptions,
                                            handleCheckboxChange,
                                            isFilterVisible,
                                            toggleFilterVisibility
                                          }) => {


  return (
    <div
      className={`${isFilterVisible ? 'block' : 'hidden'} md:block absolute flex flex-col items-center top-[139px] md:top-[80px] right-1 text-mainTheme z-[999] bg-white p-3 lg:p-8 bg-opacity-90 border rounded border-mainTheme border-opacity-20`}
    >
      <p className="pb-3 font-bold text-xl text-center">Бузуулардын түрлөрү</p>
      <form className="flex flex-col space-y-4 mb-10">
        {violationTypes.map((item) => (
          <label key={item.id} className="inline-flex items-center space-x-2">
            <div className="relative">
              <input
                type="checkbox"
                name={item.violationType}
                checked={selectedOptions.some((option) => option.id === item.id)}
                onChange={(e) => handleCheckboxChange(e, item)}
                className="form-checkbox opacity-0 absolute" // Скрыть стандартный чекбокс
              />
              <div
                className="flex justify-center items-center rounded-full bg-gray-200"
                style={{width: "30px", height: "30px"}} // Размер круга
              >
                {selectedOptions.some((option) => option.id === item.id) ? (
                  <img
                    src={`${apiURL}static/uploads/icons/${item.icon}`}
                    alt={item.violationType}
                    className="w-2/3 h-2/3 object-contain"
                  />
                ) : (
                  <div className="w-2/3 h-2/3 bg-transparent"></div> // Пустая ячейка, если не выбран
                )}
              </div>
            </div>
            <span className="ml-2">{item.violationType}</span>
          </label>
        ))}
      </form>
      <button onClick={toggleFilterVisibility} className="block md:hidden text-white bg-mainTheme py-2 px-6 rounded-xl hover:bg-yellow">
        Жабуу
      </button>
      <Link to="/new-report" className="text-center hidden md:block text-white bg-mainTheme py-2 px-6 rounded-xl hover:bg-yellow">
        Бузуу жөнүндө билдирүү
      </Link>
    </div>
  );
};

export default FiltrationBlock;