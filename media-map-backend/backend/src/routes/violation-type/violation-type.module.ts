import { forwardRef, Module } from '@nestjs/common';
import { ViolationTypeController } from './violation-type.controller';
import { ViolationTypeService } from './violation-type.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViolationType } from '../../models/violation-type.models';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ViolationTypeController],
  providers: [ViolationTypeService],
  imports: [
    SequelizeModule.forFeature([ViolationType]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
})
export class ViolationTypeModule {}
