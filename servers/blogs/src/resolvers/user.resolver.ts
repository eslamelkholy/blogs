import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { UserGuard } from '../guards/admin.guard';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { name: 'FindAllUsers' })
  @UseGuards(UserGuard)
  users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation((returns) => User)
  @UseGuards(UserGuard)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }
}
