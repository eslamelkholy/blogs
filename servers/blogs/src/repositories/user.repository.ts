import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { NotFoundError } from '@common-kitchen/common';

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

  getUserById(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async deleteUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundError();

    await this.userRepository.delete({ email });

    return user;
  }
}
