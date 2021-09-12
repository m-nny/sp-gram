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
import { TgContext } from './context.interface';
import { TelegrafExceptionFilter } from './filters/telegraf-exception.filter';
import { AdminGuard } from './guards/admin.guard';
import { ReverseTextPipe } from './pipes/reverse-text.pipe';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class TBotUpdate {
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

  @Command('me')
  onMe(ctx: TgContext) {
    return JSON.stringify(ctx.from, null, 4);
  }

  @On('text')
  onMessage(
    @Message('text', new ReverseTextPipe()) reversedText: string
  ): string {
    return reversedText;
  }
}
