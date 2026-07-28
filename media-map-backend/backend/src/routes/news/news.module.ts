import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from '../../models/news.models';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([News]), forwardRef(() => UsersModule)],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
