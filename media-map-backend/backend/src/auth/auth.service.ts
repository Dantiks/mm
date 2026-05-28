import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../routes/users/users.service';
import * as bcrypt from 'bcryptjs';
import { SignUp } from '../routes/users/dto/sign-up.dto';
import { SignIn } from '../routes/users/dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(dto: SignIn) {
    const user = await this.validateUser(dto);
    await user.generateToken();
    await user.save();
    return user;
  }

  async registration(dto: SignUp) {
    const existingUser = await this.usersService.getByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }
    const user = await this.usersService.create(dto);
    return user;
  }

  async logout(id: number): Promise<{ message: string }> {
    const user = await this.usersService.getById(id);
    await user.generateToken();
    await user.save();
    return { message: 'Logout success' };
  }

  private async validateUser(dto: SignIn) {
    const user = await this.usersService.getByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }

    return user;
  }
}
