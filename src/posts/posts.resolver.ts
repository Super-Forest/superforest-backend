import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PostsService } from './posts.service';

import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';

import { CreatePostInPut, CreatePostOutPut } from './dtos/createPost.dto';
import { AllPostsOutPut } from './dtos/allPosts.dto';
import { PostInPut, PostOutput } from './dtos/post.dto';
import { UpdatePostInPut, UpdatePostOutPut } from './dtos/updatePost.dto';
import { DeletePostInPut, DeletePostOutPut } from './dtos/deletePost.dto';

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

  @Mutation(() => UpdatePostOutPut)
  @UseGuards(AuthGuard)
  async updatePost(
    @AuthUser() user,
    @Args('input') updatePostInput: UpdatePostInPut,
  ): Promise<UpdatePostOutPut> {
    return this.postService.updatePost(user, updatePostInput);
  }

  @Mutation(() => DeletePostOutPut)
  @UseGuards(AuthGuard)
  async deletePost(
    @AuthUser() user,
    @Args('input') deletePostInput: DeletePostInPut,
  ) {
    return this.postService.deletePost(user, deletePostInput);
  }
}
