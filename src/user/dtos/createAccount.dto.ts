import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}

@ObjectType()
export class UserRO {
  id: number;
  email: string;
  createdAt: Date;
  token?: string;
  password?: string;
}
