import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from '../../models/news.models';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [SequelizeModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
