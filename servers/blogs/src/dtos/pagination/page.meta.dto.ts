import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from './page.meta.interface';

@ObjectType()
export class PageMetaDto {
  @ApiProperty()
  @Field()
  page: number;

  @ApiProperty()
  @Field()
  take: number;

  @ApiProperty()
  @Field()
  itemCount: number;

  @ApiProperty()
  @Field()
  pageCount: number;

  @ApiProperty()
  @Field()
  hasPreviousPage: boolean;

  @ApiProperty()
  @Field()
  hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
