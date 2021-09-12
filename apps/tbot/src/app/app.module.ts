import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '890615029:AAElx3u5gLeA3bG8HflJ3KVdMVGOS8Nb1Pw',
    }),
  ],
  providers: [AppUpdate],
})
export class AppModule {}
