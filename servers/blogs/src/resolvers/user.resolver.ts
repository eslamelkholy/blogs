import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserGuard } from '../guards/admin.guard';
import { CreateUserDto, UserResponse } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'FindAllUsers' })
  @UseGuards(UserGuard)
  users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User, { name: 'getUserByEmail' })
  @UseGuards(UserGuard)
  getUserByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Query(() => UserResponse, { name: 'userSearch' })
  @UseGuards(UserGuard)
  userSearch(
    @Args('email', { type: () => String }) email: string,
    @Args('pageOptionDto') pageOptionDto: PageOptionsDto,
  ): Promise<UserResponse> {
    return this.userService.userSearch(email, pageOptionDto);
  }

  @Mutation(() => User)
  @UseGuards(UserGuard)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => User)
  @UseGuards(UserGuard)
  deleteUser(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.userService.deleteUser(email);
  }
}
