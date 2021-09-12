import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { SpotifyModule } from './spotify/spotify.module';
import { TBotModule } from './tbot/tbot.module';
import { UserModule } from './user/user.module';

const mongoConfig = {
  url:
    process.env.MONGO_URL ||
    'mongodb://m-nny:change-in-production@localhost:8001',
  options: {
    //bufferCommands: false,
    authSource: 'admin',
  },
};

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: true,
      },
    }),
    MongooseModule.forRoot(mongoConfig.url, mongoConfig.options),
    TBotModule,
    SpotifyModule,
    UserModule,
  ],
})
export class AppModule {}
