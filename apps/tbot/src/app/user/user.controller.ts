import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async onCreate(@Body() dto: CreateUserDto): Promise<UserModel> {
    const item = await this.userService.create(dto);
    console.log({ primaryDevice: item.preference.primaryDevice });
    return item;
  }

  @Get('/:tgId')
  async onFindByTId(@Param('tgId') tgId: number): Promise<UserModel> {
    const item = await this.userService.findByTId({ tgId });
    if (!item) {
      throw new NotFoundException(`no user with tId = ${tgId} found`);
    }
    return item;
  }
}
