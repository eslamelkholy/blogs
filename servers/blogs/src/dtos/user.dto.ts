import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
