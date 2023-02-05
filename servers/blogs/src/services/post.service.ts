import { Injectable } from '@nestjs/common';
import { Post, SegmentType } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/post.dto';
import { PostRepository } from '../repositories/post.repository';
import { UserService } from './user.service';
import { UserPostService } from './user.post.service';

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
}
