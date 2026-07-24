import React, {useRef, useState} from 'react';
import {createMarker} from "../../features/markers/markersThunks";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectViolationTypes} from "../../features/violationTypes/violationTypesSlice";
import {selectCreateMarkerLoading} from "../../features/markers/markersSlice";
import {useNavigate} from "react-router-dom";
import {MarkerBeforeModerator} from "../../types";
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import CustomAlert from "../UI/Alert/CustomAlert";

const ViolationForm = () => {
    const [formData, setFormData] = useState<MarkerBeforeModerator>({
        authorRegion: '',
        authorCity: '',
        violationTypeId: 0,
        mediaLink: '',
        image: null as File | null,
        authorComment: '',
    });
    const [isAlertOpen, setAlertOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const violationTypes = useAppSelector(selectViolationTypes);
    const createLoading = useAppSelector(selectCreateMarkerLoading);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files[0]) {
            setFormData((prevData) => ({
                ...prevData,
                image: files[0],
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newFormData = {
            ...formData, violationTypeId: Number(formData.violationTypeId)
        }

        try {
            await dispatch(createMarker(newFormData)).unwrap();
            setFormData({
                authorRegion: '',
                authorCity: '',
                violationTypeId: 0,
                mediaLink: '',
                image: null,
                authorComment: '',
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setAlertOpen(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (e) {
            console.log(e);
        }
    };

    const hideAlert = () => {
        setAlertOpen(false);
    };

    return (
        <div className="flex-1 rounded-[16px] border border-lineLight bg-white p-6 md:p-8">
            <CustomAlert
                message={'Сиздин арызыңыз кабыл алынды жана кароого жөнөтүлөт.'}
                isShow={isAlertOpen}
                hideAlert={hideAlert}
            />
            <form
                autoComplete="off" onSubmit={onSubmit}>
                <h2 className="mb-8 text-center text-[24px] font-extrabold text-navy">
                    Бузуу жөнүндө билдирүү
                </h2>
                <div className="mb-6">
                    <p className="mb-2.5 block text-gray-400 text-sm text-center">
                        <span className="text-red-600">*</span> - толтурууга милдеттүү талаа
                    </p>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <span className="text-red-500">*</span> Жашаган аймагыңызды тандаңыз:
                    </label>
                    <select
                        name="authorRegion"
                        value={formData.authorRegion}
                        onChange={selectChangeHandler}
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        required
                    >
                        <option className="py-2 my-2" value="">Жашаган аймагыңызды тандаңыз:</option>
                        <option value="Чүй облусу">Чүй облусу</option>
                        <option value="Талас облусу">Талас облусу</option>
                        <option value="Ысык-Көл облусу">Ысык-Көл облусу</option>
                        <option value="Нарын облусу">Нарын облусу</option>
                        <option value="Жалал-Абад облусу">Жалал-Абад облусу</option>
                        <option value="Ош облусу">Ош облусу</option>
                        <option value="Баткен облусу">Баткен облусу</option>
                    </select>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <span className="text-red-500">*</span> Жашаган шаарыңызды / шаарча / айылыңызды тандаңыз:
                    </label>
                    <input
                        autoComplete="off"
                        type="text"
                        placeholder="Бишкек"
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        name="authorCity"
                        value={formData.authorCity}
                        onChange={inputChangeHandler}
                        required
                    />
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <span className="text-red-500">*</span> Бузуунун түрүн тандаңыз:
                    </label>
                    <select
                        name="violationTypeId"
                        value={formData.violationTypeId}
                        onChange={selectChangeHandler}
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        required
                    >
                        <option value="" className="text-gray-400">Бузуунун түрүн тандаңыз:</option>
                        {violationTypes.map((type) =>
                            <option key={type.id} value={type.id}>{type.violationType}</option>
                        )}
                    </select>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        Медиаресурска шилтеме киргизиңиз:
                    </label>
                    <input
                        autoComplete="off"
                        type="url"
                        placeholder="Мисалы: https://lalafo.kg/"
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        name="mediaLink"
                        value={formData.mediaLink}
                        onChange={inputChangeHandler}
                    />
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        Скриншотту тиркөө:
                    </label>

                    {/* Скрываем стандартный input, добавляем стили для кастомной кнопки */}
                    <div className="relative">
                        <input
                            autoComplete="off"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            name="image"
                            onChange={fileChangeHandler}
                        />

                        {/* Кастомная кнопка */}
                        <button
                            type="button"
                            className="flex w-full items-center rounded-[10px] border border-lineLight bg-white p-3 outline-none cursor-pointer hover:bg-cream transition-colors"
                        >
                            <div className="bg-navy inline-block text-sm text-white py-2 px-4 rounded ">Файлды
                                тандоо
                            </div>
                            <span
                                className="text-sm text-gray-500 ml-5">{fileInputRef.current?.files?.[0] ? fileInputRef.current.files[0].name : 'Файл тандалган жок'}</span>
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        Бузуу боюнча комментарий калтыруу: <span className="text-gray-400">(милдеттүү эмес)</span>
                    </label>
                    <textarea
                        placeholder="Өзүңүз туш болгон же байкаган жагдайды сүрөттөп бериңиз."
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        name="authorComment"
                        value={formData.authorComment}
                        onChange={inputChangeHandler}
                    />
                </div>

                <div className="mb-10">
                    <input
                        data-ripple-light="true"
                        autoComplete="off"
                        type="submit"
                        value={createLoading ? "Жөнөтүү..." : "Жөнөтүү"}
                        // disabled={createLoading}
                        className="w-full cursor-pointer rounded-[12px] bg-gold p-4 mb-5 text-[15px] font-extrabold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
                    />
                </div>
            </form>
        </div>
    );
};

export default ViolationForm;