import { Injectable } from '@nestjs/common';
import { UserToPost } from '../entities/user.post.entity';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/post.dto';
import { UserPostRepository } from '../repositories/user.post.repository';

@Injectable()
export class UserPostService {
  constructor(private userPostRepository: UserPostRepository) {}
  async createUserPosts(
    createPostInput: CreatePostDto,
    post: Post,
  ): Promise<void> {
    const userPosts = this.prepareUserPostData(createPostInput, post);

    await this.userPostRepository.bulkInsert(userPosts);
  }

  prepareUserPostData(
    createPostInput: CreatePostDto,
    post: Post,
  ): UserToPost[] {
    const userPosts: UserToPost[] = [];

    for (const userId of createPostInput.userIds) {
      userPosts.push({ userId, postId: post.id });
    }

    return userPosts;
  }
}
