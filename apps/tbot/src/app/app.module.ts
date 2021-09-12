import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: true,
      },
    }),
    TelegrafModule.forRoot({
      token: process.env.TBOT_TOKEN,
    }),
    SpotifyModule,
  ],
  providers: [AppUpdate],
})
export class AppModule {}
