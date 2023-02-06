import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Post, PostStatus } from '../entities/post.entity';
import { CreatePostDto, NewPostViewDto, PostResponse } from '../dtos/post.dto';
import { PageOptionsDto } from '../dtos/pagination/page.option.dto';
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

  async getPosts(
    pageOptionDto: PageOptionsDto,
    user: User,
  ): Promise<PostResponse> {
    const queryBuilder = this.timelineQuery(user, pageOptionDto);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pageOptionDto,
    });

    return new PostResponse(entities, pageMetaDto);
  }

  async newPostView(newPostViewDto: NewPostViewDto): Promise<void> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    await queryBuilder
      .update(Post)
      .where('post.id = :id', { id: newPostViewDto.postId })
      .set({ totalPostViews: () => '"totalPostViews" + 1' })
      .execute();
  }

  async getProfilePosts(
    pageOptionDto: PageOptionsDto,
    user: User,
  ): Promise<PostResponse> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder
      .where('post.userId = :userId', { userId: user.id })
      .orderBy('post.created_at', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pageOptionDto,
    });

    return new PostResponse(entities, pageMetaDto);
  }

  async publishPosts(): Promise<void> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    queryBuilder
      .update(Post)
      .set({ postStatus: PostStatus.PUBLISHED })
      .execute();
  }

  timelineQuery(
    user: User,
    pageOptionDto: PageOptionsDto,
  ): SelectQueryBuilder<Post> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder
      .where(
        `post.segmentType = :segmentType AND post.postStatus = 'Published'`,
        { segmentType: user.role },
      )
      .orWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('user_to_post.postId')
          .from(UserToPost, 'user_to_post')
          .where('user_to_post.userId = :userId')
          .getQuery();
        return 'post.id IN ' + subQuery + ` AND post.postStatus = 'Published'`;
      })
      .setParameter('userId', user.id)
      .orderBy('post.created_at', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    return queryBuilder;
  }
}
