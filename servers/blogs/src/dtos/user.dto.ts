import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsEnum(UserRole)
  @Field()
  role: string;
}
