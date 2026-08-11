import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SiteText } from '../../models/site-texts.models';
import { UpdateSiteTextItemDto } from './dto/update-site-text.dto';

const DEFAULT_SITE_TEXTS: Array<{ key: string; valueRu: string; valueKy: string; category: string }> = [
  // HOME / HERO
  {
    key: 'home.heroTitle',
    valueRu: 'Платформа мониторинга и защиты медиа-прав в Кыргызстане',
    valueKy: 'Кыргызстандагы медиа укуктарды мониторингдөө жана коргоо платформасы',
    category: 'home',
  },
  {
    key: 'home.heroSubtitle',
    valueRu: 'Объединенный ресурс по выявления языка вражды, дезинформации и цифровых рисков. Подайте заявку и пройдите ИИ-фактчекинг.',
    valueKy: 'Кастык тилин, дезинформацияны жана санариптик тобокелдиктерди аныктоо боюнча бирдиктүү ресурс. Арыз бериңиз.',
    category: 'home',
  },
  {
    key: 'home.categoriesTitle',
    valueRu: 'Категории нарушений',
    valueKy: 'Укук бузуулардын категориялары',
    category: 'home',
  },
  {
    key: 'home.resourcesTitle',
    valueRu: 'Полезные ресурсы и материалы',
    valueKy: 'Пайдалуу ресурстар жана материалдар',
    category: 'home',
  },
  {
    key: 'home.resourcesSubtitle',
    valueRu: 'Изучите руководства по медиаграмотности, алгоритмы фактчекинга и юридические памятки.',
    valueKy: 'Медиасабаттуулук боюнча колдонмолорду, фактчекинг алгоритмдерин жана юридикалык эскертмелерди изилдеңиз.',
    category: 'home',
  },
  {
    key: 'home.newsTitle',
    valueRu: 'Новости и исследования',
    valueKy: 'Жаңылыктар жана изилдөөлөр',
    category: 'home',
  },

  // ABOUT
  {
    key: 'about.title',
    valueRu: 'О проекте MediaMap',
    valueKy: 'MediaMap долбоору жөнүндө',
    category: 'about',
  },
  {
    key: 'about.mission',
    valueRu: 'Наша миссия — формирование безопасного, открытого и правового информационного пространства в Кыргызской Республике.',
    valueKy: 'Биздин миссиябыз — Кыргыз Республикасында коопсуз, ачык жана укуктук маалыматтык мейкиндикти калыптандыруу.',
    category: 'about',
  },

  // CONTACTS
  {
    key: 'contacts.title',
    valueRu: 'Контакты и обратная связь',
    valueKy: 'Байланыштар жана пикир билдирүү',
    category: 'contacts',
  },
  {
    key: 'contacts.address',
    valueRu: 'г. Бишкек, Кыргызская Республика',
    valueKy: 'Бишкек ш., Кыргыз Республикасы',
    category: 'contacts',
  },
  {
    key: 'contacts.email',
    valueRu: 'info@mediamap.kg',
    valueKy: 'info@mediamap.kg',
    category: 'contacts',
  },

  // NAV & FOOTER
  {
    key: 'nav.home',
    valueRu: 'Главная',
    valueKy: 'Башкы бет',
    category: 'nav',
  },
  {
    key: 'nav.about',
    valueRu: 'О проекте',
    valueKy: 'Долбоор жөнүндө',
    category: 'nav',
  },
  {
    key: 'nav.categories',
    valueRu: 'Категории',
    valueKy: 'Категориялар',
    category: 'nav',
  },
  {
    key: 'nav.resources',
    valueRu: 'Полезное',
    valueKy: 'Пайдалуу',
    category: 'nav',
  },
  {
    key: 'nav.contacts',
    valueRu: 'Контакты',
    valueKy: 'Байланыштар',
    category: 'nav',
  },
  {
    key: 'footer.copyright',
    valueRu: '© 2026 MediaMap. Все права защищены. Разработано при поддержке медиа-экспертов КР.',
    valueKy: '© 2026 MediaMap. Бардык укуктар корголгон. КР медиа-эксперттеринин колдоосу менен иштелип чыккан.',
    category: 'footer',
  },
];

@Injectable()
export class SiteTextsService implements OnModuleInit {
  constructor(
    @InjectModel(SiteText)
    private readonly siteTextRepository: typeof SiteText,
  ) {}

  async onModuleInit() {
    await this.seedDefaults();
  }

  async seedDefaults() {
    const count = await this.siteTextRepository.count();
    if (count === 0) {
      for (const text of DEFAULT_SITE_TEXTS) {
        await this.siteTextRepository.create(text);
      }
    }
  }

  async getAll(): Promise<Record<string, { ru: string; ky: string; category?: string }>> {
    const texts = await this.siteTextRepository.findAll();
    const result: Record<string, { ru: string; ky: string; category?: string }> = {};

    for (const t of texts) {
      result[t.key] = { ru: t.valueRu, ky: t.valueKy, category: t.category };
    }

    return result;
  }

  /**
   * Значения по умолчанию — чтобы редактор мог откатить правку к исходному
   * тексту, не имея доступа к коду.
   */
  getDefaults(): Record<string, { ru: string; ky: string; category?: string }> {
    const result: Record<string, { ru: string; ky: string; category?: string }> = {};
    for (const t of DEFAULT_SITE_TEXTS) {
      result[t.key] = { ru: t.valueRu, ky: t.valueKy, category: t.category };
    }
    return result;
  }

  async updateBulk(items: UpdateSiteTextItemDto[]) {
    for (const item of items) {
      const existing = await this.siteTextRepository.findByPk(item.key);
      if (existing) {
        await existing.update({
          valueRu: item.valueRu,
          valueKy: item.valueKy,
          category: item.category || existing.category,
        });
      } else {
        await this.siteTextRepository.create({
          key: item.key,
          valueRu: item.valueRu,
          valueKy: item.valueKy,
          category: item.category || 'general',
        });
      }
    }
    return { success: true, message: 'Все тексты успешно обновлены!' };
  }
}
