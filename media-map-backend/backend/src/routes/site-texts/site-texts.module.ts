import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteText } from '../../models/site-texts.models';
import { SiteTextsService } from './site-texts.service';
import { SiteTextsController } from './site-texts.controller';

@Module({
  imports: [SequelizeModule.forFeature([SiteText])],
  controllers: [SiteTextsController],
  providers: [SiteTextsService],
  exports: [SiteTextsService],
})
export class SiteTextsModule {}
