import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);
  app.useLogger(logger);

  const globalPrefix = process.env.API_PREFIX || '/api';
  app.setGlobalPrefix(globalPrefix);

  const port = parseInt(process.env.PORT) || 9000;
  await app.listen(port);

  logger.log(`Api started at http://localhost:${port}${globalPrefix}`);
  logger.log(`Bot started`);
}

bootstrap();
