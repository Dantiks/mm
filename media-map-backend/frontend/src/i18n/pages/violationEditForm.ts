import { Language } from '../translations';

export interface ViolationEditFormContent {
  regionLabel: string;
  regionDefaultOption: string;
  regions: string[];
  cityLabel: string;
  cityPlaceholder: string;
  violationTypeLabel: string;
  violationTypeDefaultOption: string;
  mediaLinkLabel: string;
  mediaLinkPlaceholder: string;
  screenshotLabel: string;
  noImageFallback: string;
  newImageAlt: string;
  userImageAlt: string;
  userCommentLabel: string;
  userCommentPlaceholder: string;
  moderatorCommentLabel: string;
  moderatorCommentPlaceholder: string;
  submit: string;
}

const content: Record<Language, ViolationEditFormContent> = {
  ru: {
    regionLabel: 'Область проживания',
    regionDefaultOption: 'Выберите регион проживания:',
    regions: [
      'Чуйская область',
      'Таласская область',
      'Иссык-Кульская область',
      'Нарынская область',
      'Джалал-Абадская область',
      'Ошская область',
      'Баткенская область',
    ],
    cityLabel: 'Город/ГПТ/село проживания',
    cityPlaceholder: 'Введите ваш город/пгт/село (например: Бишкек)',
    violationTypeLabel: 'Вид нарушения',
    violationTypeDefaultOption: 'Выберите вид нарушения',
    mediaLinkLabel: 'Ссылка на медиа ресурс',
    mediaLinkPlaceholder: 'Введите ссылку (например: https://lalafo.kg/)',
    screenshotLabel: 'Скриншот',
    noImageFallback: 'Заявитель не прикрепил изображение',
    newImageAlt: 'Новое изображение',
    userImageAlt: 'Скриншот пользователя',
    userCommentLabel: 'Комментарий пользователя',
    userCommentPlaceholder: 'Опишите с чем вы столкнулись',
    moderatorCommentLabel: 'Комментарий модератора',
    moderatorCommentPlaceholder: 'Введите ваш комментарий',
    submit: 'Редактировать',
  },
  ky: {
    regionLabel: 'Жашаган аймак',
    regionDefaultOption: 'Жашаган аймагыңызды тандаңыз:',
    regions: [
      'Чуйская область',
      'Таласская область',
      'Иссык-Кульская область',
      'Нарынская область',
      'Джалал-Абадская область',
      'Ошская область',
      'Баткенская область',
    ],
    cityLabel: 'Жашаган шаар/ГПТ/айыл',
    cityPlaceholder: 'Шаарыңызды/пгтыңызды/айылыңызды киргизиңиз (мисалы: Бишкек)',
    violationTypeLabel: 'Бузуу түрү',
    violationTypeDefaultOption: 'Бузуу түрүн тандаңыз',
    mediaLinkLabel: 'Медиаресурска шилтеме',
    mediaLinkPlaceholder: 'Шилтемени киргизиңиз (мисалы: https://lalafo.kg/)',
    screenshotLabel: 'Скриншот',
    noImageFallback: 'Кайрылуучу сүрөт тиркеген жок',
    newImageAlt: 'Жаңы сүрөт',
    userImageAlt: 'Колдонуучунун скриншоту',
    userCommentLabel: 'Колдонуучунун комментарийи',
    userCommentPlaceholder: 'Сиз эмнеге туш болгонуңузду сүрөттөп бериңиз',
    moderatorCommentLabel: 'Модератордун комментарийи',
    moderatorCommentPlaceholder: 'Комментарийиңизди киргизиңиз',
    submit: 'Түзөтүү',
  },
};

export default content;
