import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteText } from '../../models/site-texts.models';
import { SiteTextsService } from './site-texts.service';
import { SiteTextsController } from './site-texts.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([SiteText]), UsersModule],
  controllers: [SiteTextsController],
  providers: [SiteTextsService],
  exports: [SiteTextsService],
})
export class SiteTextsModule {}
