import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInPut } from './dtos/createPost.dto';
import { AllPostsOutPut } from './dtos/allPosts.dto';
import { PostInPut, PostOutput } from './dtos/post.dto';
import { UpdatePostInPut, UpdatePostOutPut } from './dtos/updatePost.dto';
import { DeletePostInPut, DeletePostOutPut } from './dtos/deletePost.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}

  async findAllPosts(): Promise<AllPostsOutPut> {
    try {
      const posts = await this.posts.find();
      return {
        ok: true,
        posts,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load posts',
      };
    }
  }

  async findPostById({ postId }: PostInPut): Promise<PostOutput> {
    try {
      const post = await this.posts.findOne(postId);
      if (!post) {
        return {
          ok: false,
          error: 'Post not found',
        };
      }
      return {
        ok: true,
        post,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not find post',
      };
    }
  }

  async createPost(
    writer: User,
    { content }: CreatePostInPut,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const post = await this.posts.create({ content });
      post.writer = writer;

      this.posts.save(post);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create post',
      };
    }
  }

  async updatePost(
    writer: User,
    updatePostInput: UpdatePostInPut,
  ): Promise<UpdatePostOutPut> {
    try {
      const post = await this.posts.findOne(updatePostInput.postId);
      if (!post) {
        return {
          ok: false,
          error: 'Post not found',
        };
      }
      if (post.writerId !== writer.id) {
        return {
          ok: false,
          error: "You can't edit a post that you don't write",
        };
      }
      await this.posts.save([
        {
          id: updatePostInput.postId,
          ...updatePostInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit Restaurant',
      };
    }
  }

  async deletePost(
    writer: User,
    { postId }: DeletePostInPut,
  ): Promise<DeletePostOutPut> {
    try {
      const post = await this.posts.findOne(postId);
      if (!post) {
        return {
          ok: false,
          error: 'Post not found',
        };
      }
      if (post.writerId !== writer.id) {
        return {
          ok: false,
          error: "You can't delete a post that you don't write",
        };
      }
      await this.posts.delete(postId);
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: err,
      };
    }
  }
}
