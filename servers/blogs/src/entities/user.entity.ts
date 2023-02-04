import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';

export enum UserRole {
  ADMIN = 'admin',
  PROSPECT = 'prospect',
  LEAD = 'lead',
  CUSTOMER = 'customer',
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field((type) => [Post], { nullable: true })
  posts?: Post[];
}
