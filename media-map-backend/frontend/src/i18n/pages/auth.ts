import { Language } from '../translations';

export interface AuthPageContent {
  createAccount: string;
  login: string;
  signupSubtitle: string;
  loginSubtitle: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordPlaceholder: string;
  signUpErrorFallback: string;
  signInErrorFallback: string;
  signUpSubmit: string;
  signInSubmit: string;
  hasAccount: string;
  noAccount: string;
}

const content: Record<Language, AuthPageContent> = {
  ru: {
    createAccount: 'Создать аккаунт',
    login: 'Войти',
    signupSubtitle: 'Сохраняйте проверки, подписывайтесь на темы и получайте персональные дайджесты.',
    loginSubtitle: 'Войдите, чтобы продолжить работу с сохранёнными проверками и подписками.',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Электронная почта',
    password: 'Пароль',
    passwordPlaceholder: 'Минимум 8 символов',
    signUpErrorFallback: 'Не удалось создать аккаунт.',
    signInErrorFallback: 'Не удалось войти. Проверьте данные.',
    signUpSubmit: 'Зарегистрироваться →',
    signInSubmit: 'Войти →',
    hasAccount: 'Уже есть аккаунт? ',
    noAccount: 'Нет аккаунта? ',
  },
  ky: {
    createAccount: 'Аккаунт түзүү',
    login: 'Кирүү',
    signupSubtitle: 'Текшерүүлөрдү сактап, темаларга жазылып, жеке дайджесттерди алыңыз.',
    loginSubtitle: 'Сакталган текшерүүлөр жана жазылуулар менен иштөөнү улантуу үчүн кириңиз.',
    firstName: 'Атыңыз',
    lastName: 'Фамилияңыз',
    email: 'Электрондук почта',
    password: 'Сырсөз',
    passwordPlaceholder: 'Кеминде 8 белги',
    signUpErrorFallback: 'Аккаунт түзүлгөн жок.',
    signInErrorFallback: 'Кирүү мүмкүн болгон жок. Маалыматтарды текшериңиз.',
    signUpSubmit: 'Катталуу →',
    signInSubmit: 'Кирүү →',
    hasAccount: 'Аккаунтуңуз барбы? ',
    noAccount: 'Аккаунтуңуз жокпу? ',
  },
};

export default content;
