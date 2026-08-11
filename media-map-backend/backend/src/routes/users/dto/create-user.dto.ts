import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** Роли, которые администратор может выдать через панель. */
export const ASSIGNABLE_ROLES = ['ADMIN', 'MODERATOR'] as const;

/**
 * Создание пользователя администратором. Отдельно от SignUp: там роли нет
 * и быть не должно — публичная регистрация не может назначать права.
 */
export class CreateUserDto {
  @ApiProperty({ example: 'admin2@mediamap.kg' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: 'Иван Иванов' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  name?: string;

  @ApiProperty({ example: '12345678' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16 знаков' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'MODERATOR', enum: ASSIGNABLE_ROLES })
  @IsIn(ASSIGNABLE_ROLES, { message: 'Роль может быть только ADMIN или MODERATOR' })
  role: (typeof ASSIGNABLE_ROLES)[number];
}
