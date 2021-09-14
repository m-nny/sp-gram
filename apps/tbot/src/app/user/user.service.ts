import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';
import { UserAuth } from './schema/user-auth.schema';
import {
  CreateUserInfo,
  UpdateUserInfo,
  UserDocument,
  UserInfoKey,
  UserModel,
} from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserDocument>
  ) {}

  async create(itemDto: CreateUserInfo): Promise<UserDocument> {
    const createdItem = new this.userModel(itemDto);
    return createdItem.save();
  }
  async createOrUpdate(itemDto: CreateUserInfo): Promise<UserDocument> {
    const key = _.pick(itemDto, 'tgId');
    const item = await this.userModel
      .findOneAndUpdate(key, itemDto, { upsert: true, new: true })
      .exec();
    return item;
  }
  async update(key: UserInfoKey, itemDto: UpdateUserInfo) {
    const item = await this.userModel.updateOne(key, itemDto).exec();
    return item;
  }
  async findByTId(key: UserInfoKey): Promise<UserModel | null> {
    const item = await this.userModel.findOne(key).exec();
    return item;
  }
  async saveTokens(
    key: UserInfoKey,
    auth: UserAuth
  ): Promise<UserDocument | null> {
    const item = await this.userModel
      .findOneAndUpdate(key, { auth: auth }, {})
      .exec();
    return item;
  }
}
