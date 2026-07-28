import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface NewsCreationAttrs {
  title: string;
  link: string;
  contentSnippet?: string;
  pubDate: Date;
  source: string;
  guid: string;
}

@Table({ tableName: 'news' })
export class News extends Model<News, NewsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @Column({ type: DataType.TEXT })
  contentSnippet: string;

  @Column({ type: DataType.DATE, allowNull: false })
  pubDate: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  source: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  guid: string;
}
