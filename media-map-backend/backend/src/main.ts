import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipe/validation.pipe';
import * as express from 'express';
import { join } from 'path';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use('/api/static', express.static(join(process.cwd(), 'static')));

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // Если нужно разрешить куки
  });

  const config = new DocumentBuilder()
    .setTitle('Media Map Kg')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('MEDIAMAP')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // Использовать для защиты всего приложения
  // app.useGlobalGuards()

  // Глобальная валидация для всех эндпоинтов
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`We live on port = ${PORT}`));
}

start();
