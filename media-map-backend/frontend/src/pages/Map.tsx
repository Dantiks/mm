import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useAppDispatch } from '../app/hooks/useAppDispatch';
import { fetchMarkersForMap } from '../features/markers/markersThunks';
import { useAppSelector } from '../app/hooks/useAppSelector';
import { selectFetchOneMarkerLoading, selectMarkersApproved } from '../features/markers/markersSlice';
import { fetchViolationTypes } from '../features/violationTypes/violationTypesThunks';
import { selectViolationTypes } from '../features/violationTypes/violationTypesSlice';
import { ViolationTypeMutation } from '../types';
import { selectFilteredMarkers } from '../features/markers/markersSelector';
import FiltrationBlock from '../components/Map/FiltrationBlock';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LazyMapComponent = lazy(() => import('../components/Map/MapComponent'));

const Map = () => {
    const violationTypes = useAppSelector(selectViolationTypes);
    const [selectedOptions, setSelectedOptions] = useState<ViolationTypeMutation[]>([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const dispatch = useAppDispatch();
    const loadingMarkerToUpdate = useAppSelector(selectFetchOneMarkerLoading);
    const markersApproved = useAppSelector(selectMarkersApproved);
    const filteredMarkers = useAppSelector(selectFilteredMarkers(selectedOptions));

    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(fetchViolationTypes());
        dispatch(fetchMarkersForMap());
    }, [dispatch]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, item: ViolationTypeMutation) => {
        const { checked } = e.target;
        setSelectedOptions((prevSelected) =>
            checked ? [...prevSelected, item] : prevSelected.filter((option) => option.id !== item.id)
        );
    };

    return (
        <div>
            {loadingMarkerToUpdate ? (
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
            ) : (
                <Suspense fallback={<div>Загрузка карты...</div>}>
                    <LazyMapComponent markersApproved={selectedOptions.length ? filteredMarkers : markersApproved} />
                </Suspense>
            )}

            <Link
                to="/new-report"
                className="absolute text-center max-w-[170px] md:max-w-none font-semibold text-sm md:text-lg md:hidden bottom-[163px] border rounded border-gray-100 left-1/2 transform -translate-x-1/2 z-[999] text-white bg-yellow md:bg-darkBlue py-3 px-3 hover:bg-yellow"
            >
                Бузуу жөнүндө билдирүү
            </Link>

            <button
                onClick={toggleFilterVisibility}
                className="absolute top-[80px] right-1 z-[999] md:hidden flex items-center justify-center space-x-2 text-darkBlue bg-white py-2 px-2 md:rounded-xl hover:bg-yellow transition-colors duration-200"
            >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Фильтрация</span>
            </button>

            {violationTypes.length ? (
                <FiltrationBlock
                    isFilterVisible={isFilterVisible}
                    toggleFilterVisibility={toggleFilterVisibility}
                    violationTypes={violationTypes}
                    selectedOptions={selectedOptions}
                    handleCheckboxChange={handleCheckboxChange}
                />
            ) : null}
        </div>
    );
};

export default Map;
