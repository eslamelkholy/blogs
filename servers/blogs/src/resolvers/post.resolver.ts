import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserGuard } from '../guards/admin.guard';
import { Post } from '../entities/post.entity';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/post.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  @UseGuards(UserGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostDto,
  ): Promise<Post> {
    return this.postService.createPost(createPostInput);
  }
}
