import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './user.schema';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async onCreate(@Body() dto: CreateUserDto): Promise<UserModel> {
    const item = await this.userService.create(dto);
    return item;
  }

  @Get('/:tid')
  async onFindByTId(@Param('tid') tId: number): Promise<UserModel> {
    const item = await this.userService.findByTId(tId);
    if (!item) {
      throw new NotFoundException(`no user with tId = ${tId} found`);
    }
    return item;
  }
}
