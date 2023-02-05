import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserGuard } from '../guards/admin.guard';
import { CreateUserPostDto } from '../dtos/user.post';
import { UserPostService } from '../services/user.post.service';
import { UserToPost } from '../entities/user.post.entity';

@Resolver(() => UserToPost)
export class UserPostResolver {
  constructor(private userPostService: UserPostService) {}

  @Mutation(() => [UserToPost])
  @UseGuards(UserGuard)
  createUserPosts(
    @Args('createUserPostInput') createUserPostInput: CreateUserPostDto,
  ): Promise<UserToPost[]> {
    return this.userPostService.createUserPosts(createUserPostInput);
  }
}
