import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UserResponse } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';
import { PageMetaDto } from '../dtos/pagination/page.meta.dto';

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

  async userSearch(
    pageOptionDto: PageOptionsDto,
    email: string,
  ): Promise<UserResponse> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .where('user.email like :email', { email: `%${email}%` })
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pageOptionDto,
    });

    return new UserResponse(entities, pageMetaDto);
  }
}
