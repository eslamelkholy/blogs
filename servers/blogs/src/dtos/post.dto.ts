import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

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
}
