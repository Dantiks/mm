import React, {useRef, useState} from 'react';
import {createMarker} from "../../features/markers/markersThunks";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectViolationTypes} from "../../features/violationTypes/violationTypesSlice";
import {selectCreateMarkerLoading} from "../../features/markers/markersSlice";
import {useNavigate} from "react-router-dom";
import {MarkerBeforeModerator} from "../../types";
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import CustomAlert from "../UI/Alert/CustomAlert";
import {useLanguage} from "../../i18n/LanguageContext";
import violationFormContent from "../../i18n/pages/violationForm";

import EditableText from '../CMS/EditableText';
import EditableAttr from '../../components/CMS/EditableAttr';

const ViolationForm = () => {
    const {language} = useLanguage();
    const c = violationFormContent[language];
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
                message={c.alertMessage}
                isShow={isAlertOpen}
                hideAlert={hideAlert}
            />
            <form
                autoComplete="off" onSubmit={onSubmit}>
                <h2 className="mb-8 text-center text-[24px] font-extrabold text-navy">
                    <EditableText textKey="form.heading" value={c.heading} />
                </h2>
                <div className="mb-6">
                    <p className="mb-2.5 block text-gray-400 text-sm text-center">
                        <span className="text-red-600">*</span> <EditableText textKey="form.requiredNote" value={c.requiredNote} />
                    </p>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <span className="text-red-500">*</span> <EditableText textKey="form.regionLabel" value={c.regionLabel} />
                    </label>
                    <select
                        name="authorRegion"
                        value={formData.authorRegion}
                        onChange={selectChangeHandler}
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        required
                    >
                        <option className="py-2 my-2" value="">c.regionDefaultOption</option>
                        {c.regions.map((region, index) => (
                            <option key={region} value={violationFormContent.ru.regions[index]}>{region}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <span className="text-red-500">*</span> <EditableText textKey="form.cityLabel" value={c.cityLabel} />
                    </label>
                    <EditableAttr textKey="violationForm.cityPlaceholder" value={c.cityPlaceholder} label="подсказка поля">
                      {(v) => (
                        <input
                        autoComplete="off"
                        type="text"
                        placeholder={v}
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        name="authorCity"
                        value={formData.authorCity}
                        onChange={inputChangeHandler}
                        required
                    />
                      )}
                    </EditableAttr>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <span className="text-red-500">*</span> <EditableText textKey="form.violationTypeLabel" value={c.violationTypeLabel} />
                    </label>
                    <select
                        name="violationTypeId"
                        value={formData.violationTypeId}
                        onChange={selectChangeHandler}
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        required
                    >
                        <option value="" className="text-gray-400">c.violationTypeDefaultOption</option>
                        {violationTypes.map((type) =>
                            <option key={type.id} value={type.id}>{type.violationType}</option>
                        )}
                    </select>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <EditableText textKey="form.mediaLinkLabel" value={c.mediaLinkLabel} />
                    </label>
                    <EditableAttr textKey="violationForm.mediaLinkPlaceholder" value={c.mediaLinkPlaceholder} label="подсказка поля">
                      {(v) => (
                        <input
                        autoComplete="off"
                        type="url"
                        placeholder={v}
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        name="mediaLink"
                        value={formData.mediaLink}
                        onChange={inputChangeHandler}
                    />
                      )}
                    </EditableAttr>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <EditableText textKey="form.screenshotLabel" value={c.screenshotLabel} />
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
                            <div className="bg-navy inline-block text-sm text-white py-2 px-4 rounded ">
                                <EditableText textKey="form.chooseFileBtn" value={c.chooseFileButton} />
                            </div>
                            <span
                                className="text-sm text-gray-500 ml-5">{fileInputRef.current?.files?.[0] ? fileInputRef.current.files[0].name : c.noFileChosen}</span>
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-[15px] font-semibold text-navy">
                        <EditableText textKey="form.commentLabel" value={c.commentLabel} /> <span className="text-gray-400"><EditableText textKey="form.commentOptional" value={c.commentOptional} /></span>
                    </label>
                    <EditableAttr textKey="violationForm.commentPlaceholder" value={c.commentPlaceholder} label="подсказка поля">
                      {(v) => (
                        <textarea
                        placeholder={v}
                        className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
                        name="authorComment"
                        value={formData.authorComment}
                        onChange={inputChangeHandler}
                    />
                      )}
                    </EditableAttr>
                </div>

                <div className="mb-10">
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-[12px] bg-gold p-4 mb-5 text-[15px] font-extrabold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                        <EditableText textKey="form.submitBtn" value={createLoading ? c.submitting : c.submit} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ViolationForm;