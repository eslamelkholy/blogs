import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserToPost } from '../entities/user.post.entity';
import { CreateUserPostDto } from '../dtos/user.post';

@Injectable()
export class UserPostService {
  constructor(private userRepository: UserRepository) {}
  async createUserPosts(
    createUserPostDto: CreateUserPostDto,
  ): Promise<UserToPost[]> {
    console.log(createUserPostDto);

    return [new UserToPost()];
  }
}
