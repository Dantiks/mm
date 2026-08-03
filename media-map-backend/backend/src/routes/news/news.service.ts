import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { News } from '../../models/news.models';
import * as Parser from 'rss-parser';

@Injectable()
export class NewsService implements OnModuleInit {
  private readonly logger = new Logger(NewsService.name);
  private parser: Parser;

  // Многоязычные RSS источники новостей по медиа, фактчекингу и защите прав
  private readonly rssSources = [
    { url: 'https://factcheck.kg/feed/', name: 'Factcheck.kg', tag: 'фактчекинг' },
    { url: 'https://kloop.kg/feed/', name: 'Kloop Media', tag: 'расследование' },
    { url: 'https://rus.azattyk.org/api/z-$gpieey_o_', name: 'Азаттык', tag: 'аналитика' },
    {
      url: 'https://news.google.com/rss/search?q=%D1%84%D0%B0%D0%BA%D1%82%D1%87%D0%B5%D0%BA%D0%B8%D0%BD%D0%B3+OR+%D0%B4%D0%B5%D0%B7%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F+OR+%D1%8F%D0%B7%D1%8B%D0%BA+%D0%B2%D1%80%D0%B0%D0%B6%D0%B4%D1%8B+OR+%D0%BC%D0%B5%D0%B4%D0%B8%D0%B0&hl=ru&gl=KG&ceid=KG:ru',
      name: 'Google News (KG/RU)',
      tag: 'безопасность',
    },
    {
      url: 'https://news.google.com/rss/search?q=%22media+freedom%22+OR+%22fact-check%22+OR+%22misinformation%22+OR+%22hate+speech%22&hl=en-US&gl=US&ceid=US:en',
      name: 'Global Media Watch',
      tag: 'исследование',
    },
    { url: 'https://rsf.org/en/rss.xml', name: 'Reporters Without Borders', tag: 'права' },
    { url: 'https://cpj.org/feed/', name: 'CPJ International', tag: 'безопасность' },
  ];

  // Ключевые слова для фильтрации релевантных новостей
  private readonly keywords = [
    'медиа', 'журналист', 'свобода', 'фактчекинг', 'дезинформация', 'фейк',
    'вражда', 'кибер', 'безопасность', 'укук', 'миссия', 'разжигание',
    'соцсет', 'закон', 'расследование', 'fact-check', 'media', 'press',
    'freedom', 'fake', 'disinformation', 'cyber', 'security', 'journalism',
  ];

  constructor(@InjectModel(News) private newsRepository: typeof News) {
    this.parser = new Parser({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      customFields: {
        item: [
          ['media:content', 'mediaContent'],
          ['media:thumbnail', 'mediaThumbnail'],
          ['enclosure', 'enclosure'],
          ['content:encoded', 'contentEncoded'],
          ['dc:creator', 'creator'],
          ['author', 'authorName'],
        ],
      },
    });
  }

  async onModuleInit() {
    // Автоматический запуск сборщика при старте сервиса
    this.fetchAndParseNews().catch((err) =>
      this.logger.error('Failed initial RSS fetch', err),
    );
  }

  async getAllNews(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    return this.newsRepository.findAndCountAll({
      order: [['pubDate', 'DESC']],
      limit,
      offset,
    });
  }

  async deleteNews(id: number) {
    return this.newsRepository.destroy({ where: { id } });
  }

  async create(dto: any) {
    return this.newsRepository.create({
      title: dto.title || 'Без заголовка',
      link: dto.link || '',
      contentSnippet: dto.contentSnippet || '',
      pubDate: dto.pubDate ? new Date(dto.pubDate) : new Date(),
      source: dto.source || 'Manual',
      guid: dto.guid || `manual-${Date.now()}-${Math.random()}`,
    });
  }

  async update(id: number, dto: any) {
    const newsItem = await this.newsRepository.findByPk(id);
    if (newsItem) {
      return newsItem.update(dto);
    }
    return null;
  }

  @Cron(CronExpression.EVERY_30_MINUTES, { name: 'fetchNewsCron' })
  async fetchAndParseNews() {
    this.logger.log('Starting Global Multi-Source RSS Aggregator...');
    let totalAdded = 0;

    for (const source of this.rssSources) {
      try {
        const feed = await this.parser.parseURL(source.url);
        let addedCount = 0;

        for (const item of feed.items) {
          const guid = item.guid || item.id || item.link;
          if (!guid) continue;

          const titleText = (item.title || '').toLowerCase();
          const contentText = (item.contentSnippet || item.content || '').toLowerCase();
          const fullText = `${titleText} ${contentText}`;

          // Проверка на совпадение по ключевым словам (или все для профильных медиа источников)
          const isTargetedSource = ['Factcheck.kg', 'Reporters Without Borders', 'CPJ International'].includes(source.name);
          const matchesKeyword = isTargetedSource || this.keywords.some((kw) => fullText.includes(kw));

          if (!matchesKeyword) continue;

          // Извлечение лучшего изображения из RSS (media:content, media:thumbnail, enclosure или <img> в тексте)
          let imageUrl = '';
          if ((item as any).mediaContent && (item as any).mediaContent.$ && (item as any).mediaContent.$.url) {
            imageUrl = (item as any).mediaContent.$.url;
          } else if ((item as any).mediaThumbnail && (item as any).mediaThumbnail.$ && (item as any).mediaThumbnail.$.url) {
            imageUrl = (item as any).mediaThumbnail.$.url;
          } else if (item.enclosure && item.enclosure.url) {
            imageUrl = item.enclosure.url;
          } else {
            // Регулярное выражение для поиска src у <img>
            const imgMatch = (item.content || (item as any).contentEncoded || '').match(/<img[^>]+src=["']([^"']+)["']/i);
            if (imgMatch) {
              imageUrl = imgMatch[1];
            }
          }

          // Проверяем существование в базе данных
          const exists = await this.newsRepository.findOne({ where: { guid } });
          if (!exists) {
            await this.newsRepository.create({
              title: item.title || 'Без заголовка',
              link: item.link || '',
              contentSnippet: item.contentSnippet || item.content || '',
              pubDate: new Date(item.pubDate || Date.now()),
              source: `${source.name}${imageUrl ? `|${imageUrl}` : ''}`,
              guid: guid,
            });
            addedCount++;
            totalAdded++;
          }
        }

        this.logger.log(`Parsed ${source.name}: Added ${addedCount} items.`);
      } catch (error) {
        this.logger.error(`Error parsing RSS from ${source.name}:`, error.message || error);
      }
    }

    this.logger.log(`Global RSS parsing completed. Total new items: ${totalAdded}`);
  }
}
