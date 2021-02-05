import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class CreatePostInPut extends PickType(Post, ['userId', 'content']) {}

@ObjectType()
export class CreatePostOutPut extends CoreOutPut {}
