import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { UserToPost } from './user.post.entity';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  subTitle: string;

  @Field()
  @Column({ type: 'text' })
  text: string;

  @Field()
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @Field((type) => User)
  user: User;

  @OneToMany(() => UserToPost, (userToPost) => userToPost.post)
  public userToPost: UserToPost[];
}
