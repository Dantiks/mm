import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUp {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: 'Jack Russel', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  name: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16 знаков' })
  @IsNotEmpty()
  password: string;
}
