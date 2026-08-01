import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Marker } from './markers.models';
import { randomUUID } from 'crypto';

interface UserCreationAttrs {
  email: string;
  password: string;
  role?: string;
  name?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Электронная почта',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'wadaboo',
    description: 'Уникальное значения для идентификации',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  token: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Уникальное значения для идентификации',
  })
  @Column({ type: DataType.STRING, defaultValue: 'MODERATOR' })
  role: string;

  @HasMany(() => Marker)
  markers: Marker[];

  async generateToken() {
    this.token = randomUUID();
  }

  toJSON() {
    const attributes = { ...this.get() };
    delete attributes.password;
    return attributes;
  }
}
