import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page.meta.dto';

@ObjectType()
export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  @Field()
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  @Field()
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
