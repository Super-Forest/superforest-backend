import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class PostInPut {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class PostOutput extends CoreOutPut {
  @Field(() => Post, { nullable: true })
  post?: Post;
}
