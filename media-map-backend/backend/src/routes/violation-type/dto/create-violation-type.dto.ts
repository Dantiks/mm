import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateViolationTypeDto {
  @ApiProperty({
    example: 'Язык вражды',
    description: 'Название типа нарушения',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly violationType: string;

  @ApiProperty({ example: 'hate.png', description: 'Иконка нарушения' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  icon: string;
}
