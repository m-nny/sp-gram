import { UseFilters, UseGuards } from '@nestjs/common';
import {
  Command,
  Help,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TgContext } from './common/context.interface';
import { TelegrafExceptionFilter } from './common/filters/telegraf-exception.filter';
import { AdminGuard } from './common/guards/admin.guard';
import { ReverseTextPipe } from './common/pipes/reverse-text.pipe';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class AppUpdate {
  constructor(@InjectBot() private bot: Telegraf<TgContext>) {}

  @Start()
  async onStart() {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  async onHelp() {
    return `Send me any text`;
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return `Welcome admin`;
  }

  @On('text')
  onMessage(
    @Message('text', new ReverseTextPipe()) reversedText: string
  ): string {
    return reversedText;
  }
}
