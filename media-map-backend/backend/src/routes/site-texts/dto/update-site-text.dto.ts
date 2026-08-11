import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSiteTextItemDto {
  @IsString()
  @IsNotEmpty({ message: 'key не может быть пустым' })
  @MaxLength(200)
  key: string;

  // Пустое значение допускается: в табличном редакторе часть ключей
  // переведена только на один язык, и запрет ломал сохранение всей таблицы.
  // Инлайн-редактор пустой текст всё равно не отправляет.
  @IsString()
  @MaxLength(10000)
  valueRu: string;

  @IsString()
  @MaxLength(10000)
  valueKy: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;
}

export class BulkUpdateSiteTextsDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'Список изменений пуст' })
  @ArrayMaxSize(500)
  // Без ValidateNested + Type вложенные объекты не проверяются вообще.
  @ValidateNested({ each: true })
  @Type(() => UpdateSiteTextItemDto)
  items: UpdateSiteTextItemDto[];
}
