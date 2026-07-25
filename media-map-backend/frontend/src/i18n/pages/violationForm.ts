import { Language } from '../translations';

export interface ViolationFormContent {
  alertMessage: string;
  heading: string;
  requiredNote: string;
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
  chooseFileButton: string;
  noFileChosen: string;
  commentLabel: string;
  commentOptional: string;
  commentPlaceholder: string;
  submitting: string;
  submit: string;
}

const content: Record<Language, ViolationFormContent> = {
  ru: {
    alertMessage: 'Ваше обращение принято и будет отправлено на рассмотрение.',
    heading: 'Сообщить о нарушении',
    requiredNote: '- обязательное для заполнения поле',
    regionLabel: 'Выберите регион проживания:',
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
    cityLabel: 'Выберите ваш город / посёлок / село проживания:',
    cityPlaceholder: 'Бишкек',
    violationTypeLabel: 'Выберите вид нарушения:',
    violationTypeDefaultOption: 'Выберите вид нарушения:',
    mediaLinkLabel: 'Укажите ссылку на медиаресурс:',
    mediaLinkPlaceholder: 'Например: https://lalafo.kg/',
    screenshotLabel: 'Прикрепить скриншот:',
    chooseFileButton: 'Выбрать файл',
    noFileChosen: 'Файл не выбран',
    commentLabel: 'Оставить комментарий по нарушению:',
    commentOptional: '(необязательно)',
    commentPlaceholder: 'Опишите ситуацию, с которой вы столкнулись или которую заметили.',
    submitting: 'Отправка...',
    submit: 'Отправить',
  },
  ky: {
    alertMessage: 'Сиздин кайрылууңуз кабыл алынды жана каралуу үчүн жөнөтүлөт.',
    heading: 'Бузуу жөнүндө билдирүү',
    requiredNote: '- милдеттүү түрдө толтурулуучу талаа',
    regionLabel: 'Жашаган аймагыңызды тандаңыз:',
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
    cityLabel: 'Жашаган шаарыңызды / посёлогуңузду / айылыңызды тандаңыз:',
    cityPlaceholder: 'Бишкек',
    violationTypeLabel: 'Бузуу түрүн тандаңыз:',
    violationTypeDefaultOption: 'Бузуу түрүн тандаңыз:',
    mediaLinkLabel: 'Медиаресурска шилтемени көрсөтүңүз:',
    mediaLinkPlaceholder: 'Мисалы: https://lalafo.kg/',
    screenshotLabel: 'Скриншот тиркөө:',
    chooseFileButton: 'Файл тандоо',
    noFileChosen: 'Файл тандалган жок',
    commentLabel: 'Бузуу боюнча комментарий калтырыңыз:',
    commentOptional: '(милдеттүү эмес)',
    commentPlaceholder: 'Сиз кезиккен же байкаган кырдаалды сүрөттөп бериңиз.',
    submitting: 'Жөнөтүлүүдө...',
    submit: 'Жөнөтүү',
  },
};

export default content;
