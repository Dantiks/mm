import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMarkerDto {
  @IsOptional()
  @IsString()
  readonly position: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  readonly isApproved: boolean;

  @IsOptional()
  @IsString()
  readonly moderatorComment: string;

  @IsOptional()
  @IsString()
  readonly authorRegion: string;

  @IsOptional()
  @IsString()
  readonly authorCity: string;

  @IsOptional()
  @IsString()
  readonly mediaLink: string;

  @IsOptional()
  @IsString()
  readonly authorComment: string;

  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined ? Number(value) : value,
  )
  @IsNumber()
  readonly violationTypeId: number;
}
