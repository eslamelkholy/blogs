import { Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { name: 'FindAllUsers' })
  users(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
