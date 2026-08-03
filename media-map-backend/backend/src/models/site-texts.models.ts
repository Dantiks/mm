import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SiteTextCreationAttrs {
  key: string;
  valueRu: string;
  valueKy: string;
  category?: string;
}

@Table({ tableName: 'site_texts' })
export class SiteText extends Model<SiteText, SiteTextCreationAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  })
  key: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  valueRu: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  valueKy: string;

  @Column({ type: DataType.STRING, defaultValue: 'general' })
  category: string;
}
