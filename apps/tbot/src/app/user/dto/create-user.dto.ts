import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserInfo } from '../schema/user.schema';

export class CreateUserDto implements CreateUserInfo {
  @IsString()
  readonly fullname!: string;

  @IsNumber()
  readonly tgId!: number;

  @IsOptional()
  @IsString()
  readonly tgUsername?: string;
}
