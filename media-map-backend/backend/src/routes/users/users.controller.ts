import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../models/users.models';
import { SignUp } from './dto/sign-up.dto';
import { TokenAuthGuard } from '../../auth/token-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(TokenAuthGuard)
  @Post()
  create(@Body() dto: SignUp) {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(TokenAuthGuard)
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удалён' })
  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }

  // @ApiOperation({summary: 'Выдать роль'})
  // @ApiResponse({status: 200})
  // @Roles("ADMIN")
  // @UseGuards(RolesGuard)
  // @Post('/role')
  // addRole(@Body() dto: AddRoleDto) {
  //   return this.usersService.addRole(dto);
  // }

  // @ApiOperation({summary: 'Забанить пользователя'})
  // @ApiResponse({status: 200})
  // @Roles("ADMIN")
  // @UseGuards(RolesGuard)
  // @Post('/ban')
  // ban(@Body() dto: BanUserDto) {
  //   return this.usersService.ban(dto);
  // }
}
