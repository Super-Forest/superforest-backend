import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { CreatePostInPut } from './createPost.dto';

@InputType()
export class UpdatePostInPut extends PartialType(CreatePostInPut) {
  @Field(() => Number)
  postId: number;
}

@ObjectType()
export class UpdatePostOutPut extends CoreOutPut {}
