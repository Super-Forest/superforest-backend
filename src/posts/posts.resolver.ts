import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInPut, CreatePostOutPut } from './dtos/createPost.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver()
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}
  @Query(() => [Post])
  posts(): Post[] {
    return [];
  }

  @Mutation(() => CreatePostOutPut)
  @UseGuards(AuthGuard)
  async createPost(
    @AuthUser() user,
    @Args('input') createPostInput: CreatePostInPut,
  ): Promise<CreatePostOutPut> {
    return this.postService.createPost(user, createPostInput);
  }
}
