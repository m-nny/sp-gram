import { Injectable } from '@nestjs/common';
import { SpotifyService } from '../spotify/spotify.service';
import { CreateUserInfo } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { TgContext } from './context.interface';

@Injectable()
export class TbotService {
  constructor(
    private userService: UserService,
    private spotifyService: SpotifyService
  ) {}
  async getUserInfo(ctx: TgContext) {
    const dbUser = await this.userService.findByTId({ tgId: ctx.from.id });
    const accessToken = dbUser?.auth.accessToken;
    let spotifyUser = undefined;
    if (accessToken) {
      spotifyUser = await this.spotifyService.getClientInfo({
        accessToken,
      });
    }
    return { dbUser, tgUser: ctx.from, spotifyUser };
  }

  async registerUser(ctx: TgContext) {
    const user = await this.userService.createOrUpdate(
      this.hydrateUserInfo(ctx)
    );
    return user;
  }

  private hydrateUserInfo(ctx: TgContext): CreateUserInfo {
    const tgId = ctx.from.id;
    let fullname = ctx.from.first_name;
    if (ctx.from.last_name) {
      fullname += ' ' + ctx.from.last_name;
    }
    const tgUsername = ctx.from.username;
    return { tgId, fullname, tgUsername };
  }

  async authenticateUser(ctx: TgContext) {
    const user = await this.registerUser(ctx);
    const state = `${user.tgId}`;
    const url = this.spotifyService.getAuthorizationUrl({ state });
    return { url };
  }
}
