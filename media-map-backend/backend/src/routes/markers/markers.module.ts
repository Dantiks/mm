import { Module } from '@nestjs/common';
import { MarkersController } from './markers.controller';
import { MarkersService } from './markers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Marker } from '../../models/markers.models';
import { User } from '../../models/users.models';
import { ViolationType } from '../../models/violation-type.models';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ViolationTypeModule } from '../violation-type/violation-type.module';
import { ViolationTypeService } from '../violation-type/violation-type.service';
import { EmailModule } from '../../email/email.module';
import { EmailService } from '../../email/email.service';

@Module({
  controllers: [MarkersController],
  providers: [MarkersService, UsersService, ViolationTypeService, EmailService],
  imports: [
    SequelizeModule.forFeature([User, Marker, ViolationType]),
    UsersModule,
    ViolationTypeModule,
    EmailModule,
  ],
})
export class MarkersModule {}
