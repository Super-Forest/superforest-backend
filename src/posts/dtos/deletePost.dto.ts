import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';

@InputType()
export class DeletePostInPut {
  @Field(() => Number)
  postId: number;
}

@ObjectType()
export class DeletePostOutPut extends CoreOutPut {}
