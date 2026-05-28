import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.models';
import { ViolationType } from './violation-type.models';

export interface LatLng {
  lat: number;
  lng: number;
}

interface MarkerCreationAttrs {
  position: LatLng;
  authorRegion: string;
  authorCity: string;
  mediaLink?: string;
  image?: string;
  authorComment?: string;
  moderatorComment?: string;
  userId: number;
  violationTypeId: number;
}

@Table({ tableName: 'markers' })
export class Marker extends Model<Marker, MarkerCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '{ lat: 41.2044, lng: 74.7661}',
    description: 'Широта и долгота',
  })
  @Column({ type: DataType.JSON, allowNull: true })
  position: LatLng;

  @ApiProperty({
    example: 'Chui region',
    description: 'Область проживания автора',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  authorRegion: string;

  @ApiProperty({ example: 'Каракол', description: 'Место проживание автора' })
  @Column({ type: DataType.STRING, allowNull: false })
  authorCity: string;

  @ApiProperty({
    example: 'lalafo.kg',
    description: 'Ссылка на медиа ресурс где было нарушение',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  mediaLink: string;

  @ApiProperty({ example: 'image.jpg', description: 'Скриншот с нарушением' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ApiProperty({
    example: 'Пример комментария',
    description: 'Комментарий от автора',
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  authorComment: string;

  @ApiProperty({
    example: 'Пример комментария',
    description: 'Комментарий от модератора',
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  moderatorComment: string;

  @ApiProperty({ example: 'true', description: 'Одобрено или нет модератором' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isApproved: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    onDelete: 'SET NULL',
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => ViolationType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  violationTypeId: number;

  @BelongsTo(() => ViolationType)
  violationType: ViolationType;
}
