import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { Post, SegmentType } from 'src/entities/post.entity';
import { PaginatedResultSet } from './pagination/pagination.type';
import { PageMetaDto } from './pagination/page.meta.dto';

@InputType()
export class CreatePostDto {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  subTitle: string;

  @IsString()
  @Field()
  text: string;

  @IsUUID()
  @Field()
  userId: string;

  @IsEnum(SegmentType)
  @Field()
  segmentType: string;

  @IsUUID(undefined, { each: true })
  @Field((type) => [String], { nullable: true })
  userIds?: string[];
}

@ObjectType()
export class PostResponse implements PaginatedResultSet<Post> {
  @Field(() => [Post], { nullable: true })
  entities?: Post[];

  @Field(() => PageMetaDto)
  pagination: PageMetaDto;

  constructor(entities: Post[], pagination: PageMetaDto) {
    this.entities = entities;

    this.pagination = pagination;
  }
}
