import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './routes/users/users.module';
import { User } from './models/users.models';
import { AuthModule } from './auth/auth.module';
import { MarkersModule } from './routes/markers/markers.module';
import { ViolationTypeModule } from './routes/violation-type/violation-type.module';
import { Marker } from './models/markers.models';
import { ViolationType } from './models/violation-type.models';
import { EmailModule } from './email/email.module';
import * as process from 'node:process';
import { MailerModule } from '@nestjs-modules/mailer';
import { TelegramModule } from './telegram/telegram.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from './routes/news/news.module';
import { News } from './models/news.models';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: `"Media Map" <${process.env.EMAIL_USER}>`,
      },
    }),
    SequelizeModule.forRoot({
      dialect: (process.env.DB_DIALECT as any) || 'sqlite',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      storage:
        process.env.DB_DIALECT === 'postgres' ? undefined : './database.sqlite',
      models: [User, Marker, ViolationType, News],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MarkersModule,
    ViolationTypeModule,
    EmailModule,
    TelegramModule,
    ScheduleModule.forRoot(),
    NewsModule,
  ],
})
export class AppModule {}
