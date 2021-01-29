import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInPut extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class CreateAccountOutPut extends CoreOutPut {}
