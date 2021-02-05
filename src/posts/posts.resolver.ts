import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInPut, CreatePostOutPut } from './dtos/createPost.dto';

@Resolver()
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}
  @Query(() => [Post])
  posts(): Post[] {
    return [];
  }

  @Mutation(() => CreatePostOutPut)
  async createPost(
    @Args('input') createPostInput: CreatePostInPut,
  ): Promise<CreatePostOutPut> {
    return this.postService.createPost(createPostInput);
  }
}
