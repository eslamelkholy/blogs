import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserGuard } from '../guards/admin.guard';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'FindAllUsers' })
  @UseGuards(UserGuard)
  users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  @UseGuards(UserGuard)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => User, { name: 'getUserByEmail' })
  @UseGuards(UserGuard)
  getUserByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.userService.getUserByEmail(email);
  }
}
