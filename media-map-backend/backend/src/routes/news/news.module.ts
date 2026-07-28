import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from '../../models/news.models';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([News]), UsersModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
