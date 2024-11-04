import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Conexa-API')
    .setDescription('Documentacion de Star-Wars Conexa API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document)

  const logger = new Logger('Bootsrap');
  await app.listen(3000);
  logger.log('Aplicacion escuchando en el http://localhost:3000');
}
bootstrap();
