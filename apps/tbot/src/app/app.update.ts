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
import { ReverseTextPipe } from './common/pipes/reverse-text.pipe';

@Update()
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
  onAdminCommand(): string {
    return `Welcome admin`;
  }
  @On('text')
  onMessage(
    @Message('text', new ReverseTextPipe()) originalText: string
  ): string {
    return originalText;
  }
}
