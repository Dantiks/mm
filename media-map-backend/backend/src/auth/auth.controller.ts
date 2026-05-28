import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUp } from '../routes/users/dto/sign-up.dto';
import { SignIn } from '../routes/users/dto/sign-in.dto';
import { TokenAuthGuard } from './token-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from '../models/users.models';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  login(@Body() dto: SignIn) {
    return this.authService.login(dto);
  }

  @Post('/sign-up')
  registration(@Body() dto: SignUp) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'Выход пользователя из системы' })
  @UseGuards(TokenAuthGuard)
  @Delete('/sessions')
  @HttpCode(204) // Возвращает статус 204 No Content
  async logout(@CurrentUser() user: User): Promise<{ message: string }> {
    return this.authService.logout(user.id);
  }
}
