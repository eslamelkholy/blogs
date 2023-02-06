import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewPostViewDto } from '../dtos/post.dto';
import { PostViews } from '../entities/post.views.entity';

@Injectable()
export class PostViewsRepository {
  constructor(
    @InjectRepository(PostViews)
    private postViewsRepository: Repository<PostViews>,
  ) {}

  async getCurrentPostViews(
    newPostViewDto: NewPostViewDto,
  ): Promise<PostViews> {
    const postView = this.postViewsRepository.findOne({
      where: { userId: newPostViewDto.userId, postId: newPostViewDto.postId },
    });

    return postView;
  }

  async addPostViews(newPostViewDto: NewPostViewDto): Promise<PostViews> {
    return this.postViewsRepository.save(newPostViewDto);
  }
}
