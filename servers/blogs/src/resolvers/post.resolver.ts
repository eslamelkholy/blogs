import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserGuard } from '../guards/admin.guard';
import { Post } from '../entities/post.entity';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/post.dto';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';

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

  @Query(() => [Post], { name: 'GetUserPosts' })
  getPosts(
    @Args('pageOptionDto') pageOptionDto: PageOptionsDto,
    @Context('req') req,
  ): Promise<Post[]> {
    return this.postService.getPosts(pageOptionDto, req.body.variables.id);
  }

  @Query(() => [Post], { name: 'GetProfilePosts' })
  getProfilePosts(
    @Args('pageOptionDto') pageOptionDto: PageOptionsDto,
    @Context('req') req,
  ): Promise<Post[]> {
    return this.postService.getProfilePosts(
      pageOptionDto,
      req.body.variables.id,
    );
  }

  // TODO: Profile Posts
  // TODO: Logger
  // TODO: Jobs
}
