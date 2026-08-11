import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../routes/users/users.service';

// Роли в БД хранятся в верхнем регистре ('ADMIN', 'MODERATOR', 'SUPERADMIN'),
// но в коде местами сравнивались с 'admin'. Сравниваем без учёта регистра.
const ALLOWED_ROLES = ['ADMIN', 'SUPERADMIN'];

/**
 * Пропускает только пользователей, которым разрешена правка контента сайта.
 * Токен приходит в заголовке Authorization без префикса Bearer —
 * так его шлёт фронтенд (см. frontend/src/axiosApi.ts).
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.get('Authorization');

    if (!token) {
      throw new UnauthorizedException('Требуется авторизация');
    }

    const user = await this.usersService.findByToken(token);

    if (!user) {
      throw new UnauthorizedException('Недействительный токен');
    }

    if (!ALLOWED_ROLES.includes((user.role || '').trim().toUpperCase())) {
      throw new ForbiddenException(
        'Недостаточно прав: правка контента доступна роли ADMIN',
      );
    }

    request.user = user;
    return true;
  }
}
