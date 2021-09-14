import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import _ from 'lodash';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);
  app.useLogger(logger);

  const globalPrefix = process.env.API_PREFIX || '/api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());

  const port = _.toInteger(process.env.PORT || 9000);
  await app.listen(port);

  logger.log(`Api started at http://localhost:${port}${globalPrefix}`);
  logger.log(`Bot started`);
}

bootstrap();
