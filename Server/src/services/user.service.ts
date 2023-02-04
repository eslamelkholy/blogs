import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  public createUser(): User {
    return new User();
  }

  public updateUser(): User {
    return new User();
  }

  getUser(): User {
    return new User();
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }

  public deleteUser(): User {
    return new User();
  }
}
