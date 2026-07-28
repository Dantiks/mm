import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { News } from '../../models/news.models';
import * as Parser from 'rss-parser';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private parser: Parser;

  // Пример источников новостей Кыргызстана
  private readonly rssSources = [
    { url: 'https://kaktus.media/rss', name: 'Kaktus Media' },
    { url: 'https://24.kg/rss/all/', name: '24.kg' },
  ];

  constructor(@InjectModel(News) private newsRepository: typeof News) {
    this.parser = new Parser();
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

  @Cron(CronExpression.EVERY_HOUR, { name: 'fetchNewsCron' })
  async fetchAndParseNews() {
    this.logger.log('Starting RSS parsing job...');
    for (const source of this.rssSources) {
      try {
        const feed = await this.parser.parseURL(source.url);
        let addedCount = 0;

        for (const item of feed.items) {
          const guid = item.guid || item.id || item.link;
          if (!guid) continue;

          // Проверяем, существует ли уже такая новость
          const exists = await this.newsRepository.findOne({ where: { guid } });
          if (!exists) {
            await this.newsRepository.create({
              title: item.title || 'Без заголовка',
              link: item.link || '',
              contentSnippet: item.contentSnippet || '',
              pubDate: new Date(item.pubDate || Date.now()),
              source: source.name,
              guid: guid,
            });
            addedCount++;
          }
        }
        this.logger.log(
          `Parsed ${source.name}: Added ${addedCount} new items.`,
        );
      } catch (error) {
        this.logger.error(`Error parsing RSS from ${source.name}:`, error);
      }
    }
    this.logger.log('RSS parsing job completed.');
  }
}
