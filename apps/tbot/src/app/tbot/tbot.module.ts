import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { SpotifyModule } from '../spotify/spotify.module';
import { UserModule } from '../user/user.module';
import { TbotService } from './tbot.service';
import { TBotUpdate } from './tbot.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TBOT_TOKEN || 'nope',
    }),
    UserModule,
    SpotifyModule,
  ],
  providers: [TBotUpdate, TbotService],
})
export class TBotModule {}
