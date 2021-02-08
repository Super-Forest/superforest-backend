import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInPut, CreatePostOutPut } from './dtos/createPost.dto';
import { AllPostsOutPut } from './dtos/allPosts.dto';
import { PostInPut, PostOutput } from './dtos/post.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver()
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Query(() => AllPostsOutPut)
  async getPosts(): Promise<AllPostsOutPut> {
    return this.postService.findAllPosts();
  }

  @Query(() => PostOutput)
  async getPost(@Args('input') postInput: PostInPut): Promise<PostOutput> {
    return this.postService.findPostById(postInput);
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
