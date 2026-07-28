import { Language } from '../translations';

export interface UsefulResourceContent {
  id: number;
  link: string;
  title: string;
  description: string;
  tag: string;
}

interface UsefulPageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  learnMore: string;
  resources: UsefulResourceContent[];
}

const content: Record<Language, UsefulPageContent> = {
  ru: {
    eyebrow: 'ресурсы',
    title: 'Полезные ресурсы',
    subtitle: 'Подборка избранных материалов по медиаграмотности, фактчекингу и критическому мышлению.',
    learnMore: 'Узнать подробнее',
    resources: [
      {
        id: 1,
        link: 'https://mediasabak.org/ru/education/',
        title: 'Mediasabak.org',
        description:
          'Информация о медиаграмотности, обучающие модули для учителей, а также игры и ролики для преподавателей.',
        tag: 'Обучение',
      },
      {
        id: 2,
        link: 'https://www.article19.org/ru/resources/hate-speech-explained-a-toolkit/',
        title: 'Article19.org',
        description: 'Практическое учебное пособие по пониманию языка вражды (на кыргызском и русском языках).',
        tag: 'Право',
      },
      {
        id: 3,
        link: 'https://factcheck.kg/category/factcheck/',
        title: 'Factcheck.kg',
        description:
          'Независимая онлайн-платформа для проверки и опровержения дезинформации, манипуляций и пропаганды.',
        tag: 'Фактчек',
      },
      {
        id: 4,
        link: 'https://school.cabar.asia/ky/books/borborduk-azijada-internetten-zha-ylyk-materialdaryn-kerekt-izild-s-2/',
        title: 'Cabar Asia',
        description: 'Как потребляются новости в интернете в Центральной Азии?',
        tag: 'Исследование',
      },
      {
        id: 5,
        link: 'https://school.cabar.asia/ky/books/onlajn-okuu-kuraldary-bojuncha-chek-list/',
        title: 'Cabar Asia',
        description: 'Чек-лист по инструментам онлайн-обучения',
        tag: 'Чек-лист',
      },
      {
        id: 6,
        link: 'https://school.cabar.asia/ky/books/zha-y-medialar-bojuncha-kurstar-zhyjnagy-zhurnalistika-mugalimderi-ch-n-metodikalyk-koldonmo/',
        title: 'Cabar Asia',
        description: 'Сборник курсов по новым медиа. Методическое пособие для преподавателей журналистики',
        tag: 'Методический',
      },
      {
        id: 7,
        link: 'https://school.cabar.asia/ky/books/mediasabattuuluk-zhana-synchyl-oj-zh-g-rt-bojuncha-kurstardyn-toptomu-zhogorku-okuu-zhajlardyn-okutuuchulary-ch-n-metodikalyk-koldonmo/',
        title: 'Cabar Asia',
        description:
          'Подборка курсов по медиаграмотности и критическому мышлению. Методическое пособие для преподавателей высших учебных заведений',
        tag: 'Курсы',
      },
      {
        id: 8,
        link: 'https://drive.google.com/file/d/1wtOXU5OCFqxh5BQySLelKSTfGMNz0Ia9/view',
        title: 'Экспресс-оценка',
        description: 'Исследование медиапотребления в Центральной Азии (в рамках проекта REVIVE).',
        tag: 'Результат',
      },
      {
        id: 99,
        link: '#',
        title: 'Доступ к предыдущей версии платформы',
        description: 'Архивный доступ к материалам и публикациям предыдущей версии MediaMap.',
        tag: 'Архив',
      },
    ],
  },
  ky: {
    eyebrow: 'ресурстар',
    title: 'Пайдалуу ресурстар',
    subtitle: 'Медиасабаттуулук, фактчекинг жана сынчыл ой жүгүртүү боюнча тандалган материалдардын жыйнагы.',
    learnMore: 'Кеңири маалымат',
    resources: [
      {
        id: 1,
        link: 'https://mediasabak.org/ru/education/',
        title: 'Mediasabak.org',
        description:
          'Медиасабаттуулук боюнча маалымат, мугалимдер үчүн окутуу модулдары, ошондой эле мугалимдер үчүн оюндар жана видеоролдор.',
        tag: 'Окутуу',
      },
      {
        id: 2,
        link: 'https://www.article19.org/ru/resources/hate-speech-explained-a-toolkit/',
        title: 'Article19.org',
        description: 'Жек көрүүчүлүк тилин түшүнүү боюнча практикалык окуу колдонмосу (кыргыз жана орус тилдеринде).',
        tag: 'Укук',
      },
      {
        id: 3,
        link: 'https://factcheck.kg/category/factcheck/',
        title: 'Factcheck.kg',
        description:
          'Дезинформацияны, манипуляцияларды жана пропаганданы текшерүү жана четке кагуу үчүн көз карандысыз онлайн-платформа.',
        tag: 'Фактчек',
      },
      {
        id: 4,
        link: 'https://school.cabar.asia/ky/books/borborduk-azijada-internetten-zha-ylyk-materialdaryn-kerekt-izild-s-2/',
        title: 'Cabar Asia',
        description: 'Борбордук Азияда интернеттеги жаңылыктар кантип керектелет?',
        tag: 'Изилдөө',
      },
      {
        id: 5,
        link: 'https://school.cabar.asia/ky/books/onlajn-okuu-kuraldary-bojuncha-chek-list/',
        title: 'Cabar Asia',
        description: 'Онлайн окутуу куралдары боюнча текшерүү баракчасы',
        tag: 'Текшерүү баракчасы',
      },
      {
        id: 6,
        link: 'https://school.cabar.asia/ky/books/zha-y-medialar-bojuncha-kurstar-zhyjnagy-zhurnalistika-mugalimderi-ch-n-metodikalyk-koldonmo/',
        title: 'Cabar Asia',
        description: 'Жаңы медиалар боюнча курстардын жыйнагы. Журналистика мугалимдери үчүн методикалык колдонмо',
        tag: 'Методикалык',
      },
      {
        id: 7,
        link: 'https://school.cabar.asia/ky/books/mediasabattuuluk-zhana-synchyl-oj-zh-g-rt-bojuncha-kurstardyn-toptomu-zhogorku-okuu-zhajlardyn-okutuuchulary-ch-n-metodikalyk-koldonmo/',
        title: 'Cabar Asia',
        description:
          'Медиасабаттуулук жана сынчыл ой жүгүртүү боюнча курстардын тандоосу. Жогорку окуу жайлардын мугалимдери үчүн методикалык колдонмо',
        tag: 'Курстар',
      },
      {
        id: 8,
        link: 'https://drive.google.com/file/d/1wtOXU5OCFqxh5BQySLelKSTfGMNz0Ia9/view',
        title: 'Экспресс-баалоо',
        description: 'Борбордук Азиядагы медиа керектөөнү изилдөө (REVIVE долбоорунун алкагында).',
        tag: 'Жыйынтык',
      },
      {
        id: 99,
        link: '#',
        title: 'Мурунку платформага кирүү',
        description: 'MediaMap мурунку версиясынын материалдарына жана басылмаларына архивдик кирүү.',
        tag: 'Архив',
      },
    ],
  },
};

export default content;
