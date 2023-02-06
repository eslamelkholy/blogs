import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { PostViews } from './post.views.entity';
import { UserToPost } from './user.post.entity';

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

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToMany(() => Post, (post) => post.user)
  @Field((type) => [Post], { nullable: true })
  posts?: Post[];

  @OneToMany(() => UserToPost, (userToPost) => userToPost.user)
  public userToPost: UserToPost[];

  @OneToMany(() => PostViews, (postViews) => postViews.user)
  public postViews: PostViews[];
}
