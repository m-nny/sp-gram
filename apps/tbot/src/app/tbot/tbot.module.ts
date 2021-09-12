import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TBotUpdate } from './tbot.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TBOT_TOKEN,
    }),
  ],
  providers: [TBotUpdate],
})
export class TBotModule {}
