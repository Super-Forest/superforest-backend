import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

//하나의 object되, 전달시 분리된 형태로 전달을 하고 싶은 경우ㄴ
@ArgsType()
export class UserProfileInput {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutPut {
  @Field(() => User, { nullable: true })
  user?: User;
}
