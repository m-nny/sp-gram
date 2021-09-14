import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AuthorizeResult, isAuthorizeSuccessResult } from '@sp-gram/spotify';
import { SpotifyService } from './spotify.service';

@Controller('/spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('/callback')
  async onCallback(@Query() result: AuthorizeResult) {
    if (!isAuthorizeSuccessResult(result)) {
      throw new InternalServerErrorException('Could not authorize');
    }
    const tokens = await this.spotifyService.exchangeCodeForTokens(result);
    return tokens;
  }

  @Post('/:tgId/refresh-token')
  async onRefreshToken(@Param('tgId') tgId: number) {
    const token = await this.spotifyService.refreshTokens({ tgId });
    if (!token) {
      throw new NotFoundException(`User with id ${tgId} not found`);
    }
    return token;
  }
}
