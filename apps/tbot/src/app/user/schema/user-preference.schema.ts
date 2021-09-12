import { Prop } from '@nestjs/mongoose';

export class UserPreference {
  @Prop()
  primaryDevice?: string;
}

export const defaultUserPreference: UserPreference = {
  primaryDevice: undefined,
};
