import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { UserToPost } from '../entities/user.post.entity';
import { CreateUserPostDto } from '../dtos/user.post';

@Injectable()
export class UserPostRepository {
  constructor(
    @InjectRepository(Post) private userPostRepository: Repository<UserToPost>,
  ) {}
}
