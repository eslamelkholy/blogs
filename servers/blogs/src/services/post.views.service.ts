import { Injectable } from '@nestjs/common';
import { NewPostViewDto } from '../dtos/post.dto';
import { PostViews } from '../entities/post.views.entity';
import { PostViewsRepository } from '../repositories/post.views.repository';

@Injectable()
export class PostViewService {
  constructor(private postViewsRepository: PostViewsRepository) {}

  getCurrentPostViews(newPostViewDto: NewPostViewDto): Promise<PostViews> {
    const postView =
      this.postViewsRepository.getCurrentPostViews(newPostViewDto);
    return postView;
  }

  async addPostViews(newPostViewDto: NewPostViewDto): Promise<PostViews> {
    return await this.postViewsRepository.addPostViews(newPostViewDto);
  }
}
