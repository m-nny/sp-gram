import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserAuth } from './user-auth.schema';
import {
  defaultUserPreference,
  UserPreference,
} from './user-preference.schema';

@Schema({ collection: 'users' })
export class UserModel {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  tId: number;

  @Prop({ unique: true })
  tUsername?: string;

  @Prop({ type: mongoose.Schema.Types.Map })
  auth?: UserAuth;

  @Prop({ required: true, default: defaultUserPreference })
  preference: UserPreference;
}

export type UserDocument = UserModel & Document;
export type CreateUserInfo = Omit<UserModel, 'auth' | 'preference'>;
export type UpdateUserInfo = Partial<Omit<UserModel, 'tId'>>;

export const UserSchema = SchemaFactory.createForClass(UserModel);
