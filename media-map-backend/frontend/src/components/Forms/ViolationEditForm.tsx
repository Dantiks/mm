import React, {useRef, useState} from 'react';
import {MarkerBeforeModeratorMutation, MarkerOnMap, UpdateMarkerPayload} from "../../types";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectViolationTypes} from "../../features/violationTypes/violationTypesSlice";
import {apiURL} from "../../utils/constants";
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import {updateMarker} from "../../features/markers/markersThunks";
import {useLanguage} from "../../i18n/LanguageContext";
import violationEditFormContent from "../../i18n/pages/violationEditForm";

interface Props {
  item: MarkerBeforeModeratorMutation | MarkerOnMap;
  onClose: () => void;
}

const ViolationEditForm: React.FC<Props> = ({item, onClose}) => {
  const {language} = useLanguage();
  const c = violationEditFormContent[language];
  const dispatch = useAppDispatch();
  const [state, setState] = useState<MarkerBeforeModeratorMutation | MarkerOnMap>(item);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const violationTypes = useAppSelector(selectViolationTypes);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files && files[0]) {
      setNewImage(files[0]);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {...state, moderatorComment: state.moderatorComment || "", violationTypeId: Number(state.violationTypeId)};

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (newImage) {
      formData.image = newImage;
    }

    const payload: UpdateMarkerPayload = formData as UpdateMarkerPayload;
    dispatch(updateMarker(payload));
    onClose();
  };

  return (
    <form className="p-4 font-inter" onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="mb-2 block text-[15px] font-semibold text-navy">
          {c.regionLabel}
        </label>
        <select
          name="authorRegion"
          value={state.authorRegion}
          onChange={selectChangeHandler}
          className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
        >
          <option className="py-2 my-2" value="">{c.regionDefaultOption}</option>
          {c.regions.map((region, index) => (
            <option key={region} value={violationEditFormContent.ru.regions[index]}>{region}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-[15px] font-semibold text-navy">
          {c.cityLabel}
        </label>
        <input
          type="text"
          placeholder={c.cityPlaceholder}
          className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
          name="authorCity"
          value={state.authorCity}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-[15px] font-semibold text-navy">
          {c.violationTypeLabel}
        </label>
        <select
          name="violationTypeId"
          value={state.violationTypeId}
          onChange={selectChangeHandler}
          className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
        >
          <option value="">{c.violationTypeDefaultOption}</option>
          {violationTypes.map((type) =>
            <option key={type.id} value={type.id}>{type.violationType}</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-[15px] font-semibold text-navy">
          {c.mediaLinkLabel}
        </label>
        <input
          type="url"
          placeholder={c.mediaLinkPlaceholder}
          className="w-full rounded-[10px] border border-lineLight bg-white py-3 px-4 text-[15px] text-navy outline-none focus:border-gold transition-colors"
          name="mediaLink"
          value={state.mediaLink}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-[15px] font-semibold text-navy">
          {c.screenshotLabel}
        </label>
        {newImage ? (
          <img
            src={URL.createObjectURL(newImage)}
            alt={c.newImageAlt}
            className="mt-2 max-w-[400px] h-auto rounded"
          />
        ) : item.image ? (
          <img
            src={`${apiURL}static/uploads/screenshots/${item.image}`}
            alt={c.userImageAlt}
            className="mt-2 max-w-[400px] h-auto rounded"
          />
        ) : (
          c.noImageFallback
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="mt-3 w-full rounded-[10px] border border-lineLight bg-white p-2 text-[14px] text-navy outline-none focus:border-gold transition-colors"
          name="image"
          onChange={fileChangeHandler}
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-[15px] font-semibold text-navy">
          {c.userCommentLabel}
        </label>
        <textarea
          placeholder={c.userCommentPlaceholder}
          className="w-full h-[200px] rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          name="authorComment"
          value={state.authorComment!}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-[15px] font-semibold text-navy">
          {c.moderatorCommentLabel}
        </label>
        <textarea
          placeholder={c.moderatorCommentPlaceholder}
          className="w-full h-[200px] rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          name="moderatorComment"
          value={state.moderatorComment!}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mb-5 flex justify-center items-center">
        <button
          type="submit"
          className="bg-gold text-navy font-extrabold py-2.5 px-8 rounded-[12px] text-[15px] hover:opacity-90 transition-opacity"
        >
          {c.submit}
        </button>
      </div>
    </form>
  );
};

export default ViolationEditForm;