import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {EnvelopeIcon, LockClosedIcon, UserIcon} from "@heroicons/react/24/outline";
import GoogleSignInButton from "../Buttons/GoogleSignInButton";
import {SignUp} from "../../types";

interface Props {
  state: SignUp;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SignUpForm: React.FC<Props> = ({ state, inputChangeHandler, onSubmit }) => {
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const confirmPasswordInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(event.target.value);
  };

  return (
    <div
      className="max-w-[600px] rounded-sm border border-stroke border-opacity-30 bg-white shadow-default py-3 m-10 mx-auto">
      <div className="p-4 sm:p-12.5 xl:p-17.5">
        <h2 className="mb-5 text-2xl font-bold text-center text-darkBlue sm:text-title-xl2">
          Зарегистрироваться
        </h2>

        <form
          autoComplete="off" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-darkBlue">
              Имя
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                type="name"
                placeholder="Введите свое имя"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-darkBlue outline-none focus:border-primary focus-visible:shadow-none "
                value={state.name}
                onChange={inputChangeHandler}
                name="name"
              />
              <UserIcon className="absolute w-[22px] h-[22px] right-4 top-4 opacity-50" />
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-darkBlue">
              Email
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                type="email"
                placeholder="Введите свой email"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-darkBlue outline-none focus:border-primary focus-visible:shadow-none "
                value={state.email}
                onChange={inputChangeHandler}
                name="email"
              />
              <EnvelopeIcon className="absolute w-[22px] h-[22px] right-4 top-4 opacity-50" />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-darkBlue ">
              Пароль
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                type="password"
                placeholder="Введите пароль"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-darkBlue outline-none focus:border-primary focus-visible:shadow-none"
                value={state.password}
                onChange={inputChangeHandler}
                name="password"
              />
              <LockClosedIcon className="absolute w-[22px] h-[22px] right-4 top-4 opacity-50" />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-darkBlue ">
              Повторите пароль
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                pattern={state.password !== confirmedPassword ? '' : undefined}
                title="Неправильный пароль"
                type="password"
                placeholder="Введите пароль еще раз"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-darkBlue outline-none focus:border-primary focus-visible:shadow-none"
                value={confirmedPassword}
                onChange={confirmPasswordInputChangeHandler}
                name="confirmedPassword"
              />
              <LockClosedIcon className="absolute w-[22px] h-[22px] right-4 top-4 opacity-50" />
            </div>
          </div>

          <div className="mb-5">
            <input
              type="submit"
              value="Зарегистрироваться"
              className="w-full cursor-pointer rounded-lg border bg-darkBlue p-4 text-white transition hover:bg-opacity-70 bg-opacity-70"
            />
          </div>

          <GoogleSignInButton />

          <div className="mt-6 text-center text-darkBlue">
            <p>
              У вас уже есть аккаунт?{'  '}
              <Link to="/sign-in" className="text-yellow">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;