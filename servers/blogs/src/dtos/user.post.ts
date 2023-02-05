import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';
import { SegmentType } from '../entities/post.entity';

@InputType()
export class CreateUserPostDto {
  @IsUUID(undefined, { each: true })
  @Field((type) => [String], { nullable: true })
  userIds?: string;

  @Field()
  @IsUUID()
  PostId: string;

  @IsEnum(SegmentType)
  @Field()
  segmentType: string;
}
