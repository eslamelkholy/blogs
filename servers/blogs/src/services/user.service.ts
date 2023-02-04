import { BadRequestError } from '@common-kitchen/common';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(createUserInput: CreateUserDto): Promise<User> {
    // TODO: Validate Enum input and mail
    const newUser = await this.userRepository.createUser(createUserInput);
    return newUser;
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
