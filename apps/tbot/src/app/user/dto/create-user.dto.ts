import { IsNumber, IsString } from 'class-validator';
import { CreateUserInfo } from '../user.schema';

export class CreateUserDto implements CreateUserInfo {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly tId: number;
}
