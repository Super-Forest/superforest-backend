import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInPut } from './dtos/createPost.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}
  async createPost({
    userId,
    content,
  }: CreatePostInPut): Promise<{ ok: boolean; error?: string }> {
    try {
      await this.posts.save(this.posts.create({ userId, content }));
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
}
