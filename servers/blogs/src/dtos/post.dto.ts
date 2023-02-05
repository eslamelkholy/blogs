import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { SegmentType } from 'src/entities/post.entity';

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
