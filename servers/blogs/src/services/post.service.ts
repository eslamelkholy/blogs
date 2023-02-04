import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from '../errors/custom.error';
import { ErrorMsg } from '../errors/error.message';
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
    const user = await this.userService.getUserById(createPostInput.userId);

    if (!user) {
      throw new CustomError(ErrorMsg.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const newPost = await this.postRepository.createPost(createPostInput);
    return newPost;
  }
}
