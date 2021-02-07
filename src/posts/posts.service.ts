import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInPut } from './dtos/createPost.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}
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
}
