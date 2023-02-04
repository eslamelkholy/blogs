import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

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

  @IsString()
  @Field()
  userId: string;
}
