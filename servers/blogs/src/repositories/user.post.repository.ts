import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToPost } from '../entities/user.post.entity';

@Injectable()
export class UserPostRepository {
  constructor(
    @InjectRepository(UserToPost)
    private userPostRepository: Repository<UserToPost>,
  ) {}
  async bulkInsert(userToPost: UserToPost[]): Promise<void> {
    const userToPosts = this.userPostRepository.create(userToPost);

    await this.userPostRepository.save(userToPosts);
  }
}
