import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class UserAuth {
  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true })
  expiresIn: Date;
}
