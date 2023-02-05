import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { SegmentType } from 'src/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

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

export class PostDto {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public subTitle: string;

  @ApiProperty()
  public text: string;

  @ApiProperty()
  public userId: string;

  @ApiProperty()
  public segmentType: string;
}
