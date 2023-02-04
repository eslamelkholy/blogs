import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from '../errors/custom.error';
import { ErrorMsg } from '../errors/error.message';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(createUserInput: CreateUserDto): Promise<User> {
    const user = await this.userRepository.getUserByEmail(
      createUserInput.email,
    );

    if (user) {
      throw new CustomError(ErrorMsg.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.createUser(createUserInput);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new CustomError(ErrorMsg.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }

  async deleteUser(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new CustomError(ErrorMsg.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.deleteUser(email);

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new CustomError(ErrorMsg.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
