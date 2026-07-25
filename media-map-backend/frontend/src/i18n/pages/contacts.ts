import { Language } from '../translations';

export interface ContactsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  telegram: {
    title: string;
    description: string;
    cta: string;
  };
  email: {
    title: string;
    description: string;
  };
  phone: {
    title: string;
    description: string;
  };
  support: {
    title: string;
    description: string;
    button: string;
  };
}

const content: Record<Language, ContactsContent> = {
  ru: {
    eyebrow: 'контакты',
    title: 'Свяжитесь с нами',
    subtitle:
      'Если у вас есть вопросы или предложения, напишите нам через каналы, указанные ниже. Мы всегда готовы к сотрудничеству.',
    telegram: {
      title: 'Telegram',
      description: 'Нажмите на ссылку, чтобы быстро связаться с нами и присоединиться к группе.',
      cta: 'Присоединиться',
    },
    email: {
      title: 'Электронная почта',
      description: 'Пишите нам по официальным вопросам и вопросам сотрудничества.',
    },
    phone: {
      title: 'Телефон',
      description: 'Мы доступны для звонков в рабочее время.',
    },
    support: {
      title: 'Нужна техническая поддержка?',
      description: 'Если у вас возникли трудности при использовании карты, напишите нам.',
      button: 'Написать через Telegram',
    },
  },
  ky: {
    eyebrow: 'байланыш',
    title: 'Биз менен байланышыңыз',
    subtitle:
      'Суроолоруңуз же сунуштарыңыз болсо, төмөндө көрсөтүлгөн каналдар аркылуу бизге жазыңыз. Биз ар дайым кызматташууга даярбыз.',
    telegram: {
      title: 'Telegram',
      description: 'Биз менен тез байланышуу жана группага кошулуу үчүн шилтемени басыңыз.',
      cta: 'Кошулуу',
    },
    email: {
      title: 'Электрондук почта',
      description: 'Расмий маселелер жана кызматташтык боюнча бизге жазыңыз.',
    },
    phone: {
      title: 'Телефон',
      description: 'Биз иш убактысында чалууларга жеткиликтүүбүз.',
    },
    support: {
      title: 'Техникалык колдоо керекпи?',
      description: 'Картаны колдонууда кыйынчылыктар жаралса, бизге жазыңыз.',
      button: 'Telegram аркылуу жазуу',
    },
  },
};

export default content;
