import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMarkerDto {
  // @IsOptional()
  // @IsLatLng({
  //   message:
  //     'Должно быть в формате {lat: 40.939832, lng: 73.178191}',
  // })
  // readonly position: LatLng;

  @IsString({ message: 'Должно быть строкой' })
  readonly authorRegion: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly authorCity: string;

  // @IsUrl(
  //   {},
  //   {
  //     message:
  //       'Должен быть действительным URL, пример: "https://www.example.com"',
  //   },
  // )
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly mediaLink: string;

  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly authorComment: string;

  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  image: string;

  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly moderatorComment: string;

  @IsOptional()
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly violationTypeId: number;
}
