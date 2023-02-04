import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/post.dto';
import { PostRepository } from '../repositories/post.repository';
import { UserService } from './user.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userService: UserService,
  ) {}
  async createPost(createPostInput: CreatePostDto): Promise<Post> {
    await this.userService.getUserById(createPostInput.userId);

    const newPost = await this.postRepository.createPost(createPostInput);
    return newPost;
  }
}
