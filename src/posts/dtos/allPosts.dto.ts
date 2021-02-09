import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { Post } from '../entities/post.entity';

@ObjectType()
export class AllPostsOutPut extends CoreOutPut {
  @Field((type) => [Post], { nullable: true })
  posts?: Post[];
}
