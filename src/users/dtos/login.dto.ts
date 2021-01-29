import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInPut extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutPut extends CoreOutPut {
  @Field(() => String, { nullable: true })
  token: string;
}
