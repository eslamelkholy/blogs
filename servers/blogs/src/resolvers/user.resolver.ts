import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { name: 'FindAllUsers' })
  users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }
}
