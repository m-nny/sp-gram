import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TBOT_TOKEN,
    }),
  ],
  providers: [AppUpdate],
})
export class AppModule {}
