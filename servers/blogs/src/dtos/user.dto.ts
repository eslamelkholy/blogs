import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { User, UserRole } from '../entities/user.entity';
import { PageMetaDto } from './pagination/page.meta.dto';
import { PaginatedResultSet } from './pagination/pagination.type';

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

@ObjectType()
export class UserResponse implements PaginatedResultSet<User> {
  @Field(() => [User], { nullable: true })
  entities?: User[];

  @Field(() => PageMetaDto)
  pagination: PageMetaDto;

  constructor(entities: User[], pagination: PageMetaDto) {
    this.entities = entities;

    this.pagination = pagination;
  }
}
