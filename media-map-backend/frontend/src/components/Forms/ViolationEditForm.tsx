import React, {useRef, useState} from 'react';
import {MarkerBeforeModeratorMutation, MarkerOnMap, UpdateMarkerPayload} from "../../types";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectViolationTypes} from "../../features/violationTypes/violationTypesSlice";
import {apiURL} from "../../utils/constants";
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import {updateMarker} from "../../features/markers/markersThunks";

interface Props {
  item: MarkerBeforeModeratorMutation | MarkerOnMap;
  onClose: () => void;
}

const ViolationEditForm: React.FC<Props> = ({item, onClose}) => {
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
    <form className="p-4" onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="mb-2.5 block text-black text-lg">
          Область проживания
        </label>
        <select
          name="authorRegion"
          value={state.authorRegion}
          onChange={selectChangeHandler}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
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

      <div className="mb-4">
        <label className="mb-2.5 block text-black text-lg">
          Город/ГПТ/село проживания
        </label>
        <input
          type="text"
          placeholder="Введите ваш город/пгт/село (например: Бишкек)"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          name="authorCity"
          value={state.authorCity}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block text-black text-lg">
          Вид нарушения
        </label>
        <select
          name="violationTypeId"
          value={state.violationTypeId}
          onChange={selectChangeHandler}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
        >
          <option value="">Выберите вид нарушения</option>
          {violationTypes.map((type) =>
            <option key={type.id} value={type.id}>{type.violationType}</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block text-black text-lg">
          Ссылка на медиа ресурс
        </label>
        <input
          type="url"
          placeholder="Введите ссылку (например: https://lalafo.kg/)"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          name="mediaLink"
          value={state.mediaLink}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block text-black text-lg">
          Скриншот
        </label>
        {newImage ? (
          <img
            src={URL.createObjectURL(newImage)}
            alt="Новое изображение"
            className="mt-2 max-w-[400px] h-auto rounded"
          />
        ) : item.image ? (
          <img
            src={`${apiURL}static/uploads/screenshots/${item.image}`}
            alt="Скриншот пользователя"
            className="mt-2 max-w-[400px] h-auto rounded"
          />
        ) : (
          "Заявитель не прикрепил изображение"
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="w-full rounded-lg border border-stroke bg-transparent p-2 text-black outline-none focus:border-primary focus-visible:shadow-none"
          name="image"
          onChange={fileChangeHandler}
        />
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block text-black text-lg">
          Комментарий пользователя
        </label>
        <textarea
          placeholder="Опишите с чем вы столкнулись"
          className="w-full h-[200px] rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          name="authorComment"
          value={state.authorComment!}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block text-black text-lg">
          Комментарий модератора
        </label>
        <textarea
          placeholder="Введите ваш комментарий"
          className="w-full h-[200px] rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          name="moderatorComment"
          value={state.moderatorComment!}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mb-5 flex justify-center items-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-600"
        >
          Редактировать
        </button>
      </div>
    </form>
  );
};

export default ViolationEditForm;