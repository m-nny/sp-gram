import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInfo, UserDocument, UserModel } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserDocument>
  ) {}

  async create(itemDto: CreateUserInfo): Promise<UserModel> {
    const createdItem = new this.userModel(itemDto);
    return createdItem.save();
  }
  async findByTId(tId: number): Promise<UserModel | null> {
    const item = await this.userModel.findOne({ tId }).exec();
    return item;
  }
}
