import { UseFilters } from '@nestjs/common';
import { Command, Start, Update } from 'nestjs-telegraf';
import { TgContext } from './context.interface';
import { TelegrafExceptionFilter } from './filters/telegraf-exception.filter';
import { TbotService } from './tbot.service';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class TBotUpdate {
  constructor(private tbotService: TbotService) {}

  @Start()
  async onStart() {
    return `Hello there`;
  }

  @Command('/me')
  async onMe(ctx: TgContext) {
    const { dbUser, tgUser, spotifyUser } = await this.tbotService.getUserInfo(
      ctx
    );
    if (dbUser) {
      await this.replyWithJson(ctx, 'Found user in db', dbUser);
      if (spotifyUser) {
        await this.replyWithJson(ctx, 'Found user in spotify', spotifyUser);
      } else {
        await ctx.reply(`User was not authencited in spotify`);
      }
    } else {
      await ctx.reply(`User was not found in db`);
    }
    await this.replyWithJson(ctx, 'tg user', tgUser);
  }

  @Command('/register')
  async onRegister(ctx: TgContext) {
    const user = await this.tbotService.registerUser(ctx);
    return `Created user in db:\n${JSON.stringify(user, null, 4)}`;
  }

  @Command('/link_spotify')
  async onAuthenticateSpotify(ctx: TgContext) {
    const { url } = await this.tbotService.authenticateUser(ctx);
    return `Please got to ${url} and link your spotify account`;
  }

  private replyWithJson = (ctx: TgContext, txt: string, obj: any) => {
    const json = JSON.stringify(obj, null, 4);
    return ctx.replyWithHTML(`${txt}\n<pre>${json}</pre>`);
  };
}
