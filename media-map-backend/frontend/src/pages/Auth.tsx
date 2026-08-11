import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn, SignUp } from '../types';
import { useAppDispatch } from '../app/hooks/useAppDispatch';
import { useAppSelector } from '../app/hooks/useAppSelector';
import { signIn, signUp } from '../features/users/usersThunks';
import {
  selectSignInError,
  selectSignInLoading,
  selectSignUpError,
  selectSignUpLoading,
} from '../features/users/usersSlice';
import { useLanguage } from '../i18n/LanguageContext';
import authContent from '../i18n/pages/auth';
import EditableText from '../components/CMS/EditableText';
import EditableAttr from '../components/CMS/EditableAttr';

type Tab = 'signup' | 'login';

const inputClass =
  'w-full h-[47px] rounded-[10px] bg-white px-4 text-[15px] text-navy placeholder:text-[#757575] outline-none border border-transparent focus:border-gold transition-colors';

const labelClass =
  'block mb-2 text-[12px] font-semibold uppercase tracking-[0.48px] text-mutedNavy';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { language } = useLanguage();
  const c = authContent[language];

  const [tab, setTab] = useState<Tab>('signup');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpError = useAppSelector(selectSignUpError);
  const signInError = useAppSelector(selectSignInError);
  const signUpLoading = useAppSelector(selectSignUpLoading);
  const signInLoading = useAppSelector(selectSignInLoading);

  const isSignup = tab === 'signup';
  const loading = isSignup ? signUpLoading : signInLoading;

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isSignup) {
        const body: SignUp = {
          name: `${firstName} ${lastName}`.trim(),
          email,
          password,
        };
        await dispatch(signUp(body)).unwrap();
      } else {
        const body: SignIn = { email, password };
        await dispatch(signIn(body)).unwrap();
      }
      navigate('/admin');
    } catch (e) {
      console.error('Auth error:', e);
    }
  };

  return (
    <section className="bg-navy w-full min-h-full flex items-center justify-center px-4 py-16 font-inter">
      <div className="w-full max-w-[556px] rounded-[24px] bg-navyCard p-6 md:p-12 shadow-[0px_20px_30px_rgba(0,0,0,0.25)]">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-[10px] bg-navy">
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 h-[37px] rounded-[8px] text-[14px] font-bold transition-colors ${
              isSignup ? 'bg-gold text-navy' : 'text-mutedNavy hover:text-white'
            }`}
          >
            <EditableText textKey="auth.createAccount" value={c.createAccount} />
          </button>
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 h-[37px] rounded-[8px] text-[14px] font-semibold transition-colors ${
              !isSignup ? 'bg-gold text-navy' : 'text-mutedNavy hover:text-white'
            }`}
          >
            <EditableText textKey="auth.login" value={c.login} />
          </button>
        </div>

        <p className="mt-8 text-[14px] leading-normal text-mutedNavy">
          {isSignup ? c.signupSubtitle : c.loginSubtitle}
        </p>

        <form onSubmit={submitHandler} autoComplete="off" className="mt-6 space-y-5">
          {isSignup && (
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <label className={labelClass}><EditableText textKey="auth.firstName" value={c.firstName} /></label>
                <EditableAttr textKey="auth.firstName" value={c.firstName} label="подсказка поля">
                  {(v) => (
                    <input
                  className={inputClass}
                  type="text"
                  name="firstName"
                  placeholder={v}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                  )}
                </EditableAttr>
              </div>
              <div className="flex-1">
                <label className={labelClass}><EditableText textKey="auth.lastName" value={c.lastName} /></label>
                <EditableAttr textKey="auth.lastName" value={c.lastName} label="подсказка поля">
                  {(v) => (
                    <input
                  className={inputClass}
                  type="text"
                  name="lastName"
                  placeholder={v}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                  )}
                </EditableAttr>
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}><EditableText textKey="auth.email" value={c.email} /></label>
            <input
              className={inputClass}
              type="email"
              name="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}><EditableText textKey="auth.password" value={c.password} /></label>
            <EditableAttr textKey="auth.passwordPlaceholder" value={c.passwordPlaceholder} label="подсказка поля">
              {(v) => (
                <input
              className={inputClass}
              type="password"
              name="password"
              placeholder={v}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
              )}
            </EditableAttr>
          </div>

          {(signUpError || signInError) && (
            <p className="text-[13px] text-red-400">
              {isSignup
                ? Object.values(signUpError ?? {}).flat().join(' ') || c.signUpErrorFallback
                : signInError?.message || c.signInErrorFallback}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[57px] rounded-[12px] bg-gold text-navy text-[17px] font-extrabold transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isSignup ? c.signUpSubmit : c.signInSubmit}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-[#7c8ea8]">
          {isSignup ? c.hasAccount : c.noAccount}
          <button
            type="button"
            onClick={() => setTab(isSignup ? 'login' : 'signup')}
            className="font-semibold text-gold hover:underline"
          >
            {isSignup ? c.login : c.createAccount}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
