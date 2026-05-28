import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../routes/users/users.module';
import { ViolationTypeModule } from '../routes/violation-type/violation-type.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ViolationTypeModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
