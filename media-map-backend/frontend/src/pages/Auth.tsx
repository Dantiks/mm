import React, { useEffect, useState } from 'react';
import { SignIn, SignUp } from "../types";
import SignInForm from "../components/Forms/SignInForm";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SignUpForm from "../components/Forms/SignUpForm";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { signIn, signUp } from "../features/users/usersThunks";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLogin = pathname === '/admin';

  const initialSignInState: SignIn = { email: '', password: '' };
  const initialSignUpState: SignUp = { email: '', password: '', name: '' };

  const [state, setState] = useState<SignIn | SignUp>(
      isLogin ? initialSignInState : initialSignUpState
  );

  useEffect(() => {
    setState(isLogin ? initialSignInState : initialSignUpState);
  }, [isLogin]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isLogin) {
        await dispatch(signIn(state as SignIn)).unwrap();
      } else {
        await dispatch(signUp(state as SignUp)).unwrap();
      }
      navigate('/admin');
    } catch (e) {
      console.error('Auth error:', e);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
      <div className="min-h-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-sm space-y-8">

          {/* Заголовок без лишних иконок */}
          <div>
            <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
              {isLogin ? 'Кирүү' : 'Каттоо'}
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500">
              {isLogin ? 'Администратор панели' : 'Жаңы аккаунт түзүү'}
            </p>
          </div>

          {/* Форма без контейнера-карточки, просто на белом фоне */}
          <div className="mt-8">
            <div className="mt-8 space-y-4">
              {isLogin ? (
                  <SignInForm
                      state={state as SignIn}
                      inputChangeHandler={inputChangeHandler}
                      onSubmit={submitFormHandler} // Передаем наш реальный обработчик
                  />
              ) : (
                  <SignUpForm
                      state={state as SignUp}
                      inputChangeHandler={inputChangeHandler}
                      onSubmit={submitFormHandler} // Передаем наш реальный обработчик
                  />
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Auth;