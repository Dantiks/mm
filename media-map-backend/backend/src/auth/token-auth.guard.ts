import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../routes/users/users.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.get('Authorization');

    if (!token) {
      return false;
    }
    const user = await this.usersService.findByToken(token);

    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }
}
