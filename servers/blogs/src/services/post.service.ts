import { HttpStatus, Injectable } from '@nestjs/common';
import { Post, SegmentType } from '../entities/post.entity';
import { CreatePostDto, PostResponse } from '../dtos/post.dto';
import { PostRepository } from '../repositories/post.repository';
import { UserService } from './user.service';
import { UserPostService } from './user.post.service';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';
import { CustomError } from '../errors/custom.error';
import { ErrorMsg } from '../errors/error.message';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userService: UserService,
    private userPostService: UserPostService,
  ) {}
  async createPost(createPostInput: CreatePostDto): Promise<Post> {
    await this.userService.getUserById(createPostInput.userId);

    const newPost = await this.postRepository.createPost(createPostInput);

    if (createPostInput.segmentType === SegmentType.OTHER) {
      this.userPostService.createUserPosts(createPostInput, newPost);
    }

    return newPost;
  }

  async getPosts(
    pageOptionDto: PageOptionsDto,
    userId: string,
  ): Promise<PostResponse> {
    if (!userId) {
      throw new CustomError(ErrorMsg.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const user = await this.userService.getUserById(userId);

    return await this.postRepository.getPosts(pageOptionDto, user);
  }

  async getProfilePosts(
    pageOptionDto: PageOptionsDto,
    userId: string,
  ): Promise<Post[]> {
    if (!userId) {
      throw new CustomError(ErrorMsg.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const user = await this.userService.getUserById(userId);

    return await this.postRepository.getProfilePosts(pageOptionDto, user);
  }
}
