import { Language } from '../translations';

export interface FooterContent {
  navLinks: {
    about: string;
    resources: string;
    categories: string;
    contacts: string;
  };
  copyright: string;
}

const content: Record<Language, FooterContent> = {
  ru: {
    navLinks: {
      about: 'О проекте',
      resources: 'Ресурсы',
      categories: 'Категории нарушений',
      contacts: 'Контакты',
    },
    copyright: '© 2026 MediaMap.kg. Материалы публикуются в рамках инициативы медиаграмотности КР.',
  },
  ky: {
    navLinks: {
      about: 'Долбоор жөнүндө',
      resources: 'Ресурстар',
      categories: 'Бузуулардын категориялары',
      contacts: 'Байланыш',
    },
    copyright: '© 2026 MediaMap.kg. Материалдар КРдин медиасабаттуулук демилгесинин алкагында жарыяланат.',
  },
};

export default content;
