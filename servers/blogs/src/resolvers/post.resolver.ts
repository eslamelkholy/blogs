import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserGuard } from '../guards/admin.guard';
import { Post } from '../entities/post.entity';
import { PostService } from '../services/post.service';
import { CreatePostDto, NewPostViewDto, PostResponse } from '../dtos/post.dto';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';
import { PostViews } from '../entities/post.views.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostDto,
  ): Promise<Post> {
    return this.postService.createPost(createPostInput);
  }

  @Query(() => PostResponse, { name: 'GetUserPosts' })
  getPosts(
    @Args('pageOptionDto') pageOptionDto: PageOptionsDto,
    @Args('userId') userId: string,
  ): Promise<PostResponse> {
    return this.postService.getPosts(pageOptionDto, userId);
  }

  @Query(() => PostResponse, { name: 'GetProfilePosts' })
  getProfilePosts(
    @Args('pageOptionDto') pageOptionDto: PageOptionsDto,
    @Args('userId') userId: string,
  ): Promise<PostResponse> {
    return this.postService.getProfilePosts(pageOptionDto, userId);
  }

  @Query(() => Post, { name: 'GetPost' })
  getPost(@Args('postId') postId: string): Promise<Post> {
    return this.postService.getPost(postId);
  }

  @Mutation(() => PostViews, { name: 'newPostView' })
  newPostView(
    @Args('newPostViewDto') newPostViewDto: NewPostViewDto,
  ): Promise<PostViews> {
    return this.postService.newPostView(newPostViewDto);
  }
}
