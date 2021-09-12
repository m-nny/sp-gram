import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserAuth = {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
};

@Schema()
export class UserModel {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  tId: number;

  //@Prop()
  //auth?: UserAuth;
}

export type UserDocument = UserModel & Document;
export type CreateUserInfo = UserModel;

export const UserSchema = SchemaFactory.createForClass(UserModel);
