import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateUserPostDto {
  @IsUUID(undefined, { each: true })
  @Field((type) => [String], { nullable: true })
  userIds: string;

  @Field()
  @IsUUID()
  PostId: string;
}
