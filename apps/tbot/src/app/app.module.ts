import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { SpotifyModule } from './spotify/spotify.module';
import { TBotModule } from './tbot/tbot.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: true,
      },
    }),
    TBotModule,
    SpotifyModule,
  ],
})
export class AppModule {}
