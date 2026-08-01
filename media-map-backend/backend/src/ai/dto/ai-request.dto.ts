import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class ChatMessageDto {
  @ApiProperty({ example: 'user', description: 'Роль отправителя: user или assistant' })
  @IsString()
  role: string;

  @ApiProperty({ example: 'Каковы законы о защите чести и достоинства в КР?', description: 'Текст сообщения' })
  @IsString()
  content: string;
}

export class ChatRequestDto {
  @ApiProperty({ example: 'Проверь информацию', description: 'Текст промпта' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ required: false, description: 'История диалога' })
  @IsOptional()
  @IsArray()
  history?: ChatMessageDto[];
}

export class AnalyzeRequestDto {
  @ApiProperty({ example: 'https://example.com/news/123 или текст статьи', description: 'Ссылка или текст для проверки ИИ' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false, example: 'Дезинформация / Фейк', description: 'Опциональная категория нарушения' })
  @IsOptional()
  @IsString()
  category?: string;
}
