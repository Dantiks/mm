import React from 'react';
import {Link} from "react-router-dom";
import {EnvelopeIcon, LockClosedIcon} from "@heroicons/react/24/outline";
import GoogleSignInButton from "../Buttons/GoogleSignInButton";
import {SignIn} from "../../types";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectSignInError} from "../../features/users/usersSlice";

interface Props {
  state: SignIn;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SignInForm: React.FC<Props> = ({state, inputChangeHandler, onSubmit}) => {
  const signInError = useAppSelector(selectSignInError);

  return (
    <div
      className="max-w-[600px] rounded-sm border border-stroke border-opacity-30 bg-white shadow-default py-3 mt-10 mx-auto">
      <div className="p-4 sm:p-12.5 xl:p-17.5">
        <h2 className="mb-5 text-2xl font-bold text-center text-darkBlue sm:text-title-xl2">
          Войти
        </h2>
        <form autoComplete="off" onSubmit={onSubmit}>
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
                name="email"
                value={state.email}
                onChange={inputChangeHandler}
              />
              <EnvelopeIcon className="absolute w-[22px] h-[22px] right-4 top-4 opacity-50"/>
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
                name="password"
                value={state.password}
                onChange={inputChangeHandler}
              />
              <LockClosedIcon className="absolute w-[22px] h-[22px] right-4 top-4 opacity-50"/>
            </div>
          </div>

          {signInError && (
            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-center text-red-500 animate-bounce">
                {signInError.message}
              </label>
            </div>
          )}

          <div className="mb-5">
            <input
              type="submit"
              value="Войти"
              className="w-full cursor-pointer rounded-lg border bg-darkBlue p-4 text-white transition hover:bg-opacity-70"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;