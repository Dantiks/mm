import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Marker } from './markers.models';

interface ViolationTypeCreationAttrs {
  title: string;
}

@Table({ tableName: 'violation_types' })
export class ViolationType extends Model<
  ViolationType,
  ViolationTypeCreationAttrs
> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Язык вражды', description: 'Вид нарушения' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  violationType: string;

  @ApiProperty({ example: 'hate.png', description: 'Иконка для нарушения' })
  @Column({ type: DataType.STRING, allowNull: false })
  icon: string;

  @HasMany(() => Marker)
  markers: Marker[];
}
