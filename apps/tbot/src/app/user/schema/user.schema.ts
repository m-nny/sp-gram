import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserAuth } from './user-auth.schema';
import {
  defaultUserPreference,
  UserPreference,
} from './user-preference.schema';

@Schema({ collection: 'users' })
export class UserModel {
  @Prop({ required: true })
  fullname!: string;

  @Prop({ required: true, unique: true })
  tgId!: number;

  @Prop({ unique: true })
  tgUsername?: string;

  @Prop({})
  auth?: UserAuth | null;

  @Prop({ required: true, default: defaultUserPreference })
  preference!: UserPreference;
}
export type UserInfoKey = Pick<UserModel, 'tgId'>;

export type UserDocument = UserModel & Document;
export type CreateUserInfo = Omit<UserModel, 'auth' | 'preference'>;
export type UpdateUserInfo = Partial<Omit<UserModel, 'tgId'>>;

export const UserSchema = SchemaFactory.createForClass(UserModel);
