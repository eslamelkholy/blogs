import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/post.dto';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';
import { PageDto } from '../dtos/pagination/page.dto';
import { PageMetaDto } from '../dtos/pagination/page.meta.dto';
import { User } from '../entities/user.entity';
import { UserToPost } from '../entities/user.post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  createPost(createInput: CreatePostDto): Promise<Post> {
    return this.postRepository.save(createInput);
  }

  async getPosts(pageOptionDto: PageOptionsDto, user: User): Promise<Post[]> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder
      .where('post.segmentType = :segmentType', { segmentType: user.role })
      .orWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('user_to_post.postId')
          .from(UserToPost, 'user_to_post')
          .where('user_to_post.userId = :userId')
          .getQuery();
        return 'post.id IN ' + subQuery;
      })
      .setParameter('userId', user.id)
      .orderBy('post.created_at', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    const { entities } = await queryBuilder.getRawAndEntities();

    return entities;
  }

  // async getPostsV2(pageOptionDto: PageOptionsDto): Promise<PageDto<Post>> {
  //   const queryBuilder = this.postRepository.createQueryBuilder('post');

  //   queryBuilder
  //     .orderBy('post.created_at', pageOptionDto.order)
  //     .skip(pageOptionDto.skip)
  //     .take(pageOptionDto.take);

  //   const itemCount = await queryBuilder.getCount();
  //   const { entities } = await queryBuilder.getRawAndEntities();

  //   const pageMetaDto = new PageMetaDto({
  //     itemCount,
  //     pageOptionsDto: pageOptionDto,
  //   });

  //   return new PageDto(entities, pageMetaDto);
  // }
}
