import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  createUser(createInput: CreateUserDto): Promise<User> {
    return this.userRepository.save(createInput);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async deleteUser(email: string): Promise<void> {
    await this.userRepository.delete({ email });
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
