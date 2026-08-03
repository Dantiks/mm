import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSiteTextItemDto {
  @IsString()
  key: string;

  @IsString()
  valueRu: string;

  @IsString()
  valueKy: string;

  @IsOptional()
  @IsString()
  category?: string;
}

export class BulkUpdateSiteTextsDto {
  @IsArray()
  items: UpdateSiteTextItemDto[];
}
