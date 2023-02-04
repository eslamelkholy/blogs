import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(createUserInput: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.createUser(createUserInput);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.getUserById(email);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }

  async deleteUser(email: string): Promise<User> {
    const user = await this.userRepository.deleteUser(email);

    return user;
  }
}
