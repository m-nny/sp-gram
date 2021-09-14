import { Injectable } from '@nestjs/common';
import { SpotifyService } from '../spotify/spotify.service';
import { CreateUserInfo } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { TgContext, TgUser } from './context.interface';

//type NotNull<T> = T extends null

@Injectable()
export class TbotService {
  constructor(
    private userService: UserService,
    private spotifyService: SpotifyService
  ) {}
  async getUserInfo(ctx: TgContext) {
    const tgId = ctx.from.id;
    const dbUser = await this.userService.findByTId({ tgId });
    const accessToken = dbUser?.auth?.accessToken;
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
      this.hydrateUserInfo(ctx.from)
    );
    return user;
  }

  private hydrateUserInfo(from: TgUser): CreateUserInfo {
    const tgId = from.id;
    let fullname = from.first_name;
    if (from.last_name) {
      fullname += ' ' + from.last_name;
    }
    const tgUsername = from.username;
    return { tgId, fullname, tgUsername };
  }

  async authenticateUser(ctx: TgContext) {
    const user = await this.registerUser(ctx);
    const state = `${user.tgId}`;
    const url = this.spotifyService.getAuthorizationUrl({ state });
    return url;
  }
}
