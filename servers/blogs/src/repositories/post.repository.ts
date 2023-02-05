import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/post.dto';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';
import { PageDto } from '../dtos/pagination/page.dto';
import { PageMetaDto } from '../dtos/pagination/page.meta.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  createPost(createInput: CreatePostDto): Promise<Post> {
    return this.postRepository.save(createInput);
  }

  async getPosts(pageOptionDto: PageOptionsDto): Promise<Post[]> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder
      .orderBy('post.created_at', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pageOptionDto,
    });

    return entities;
  }
}
