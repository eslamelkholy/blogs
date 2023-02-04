import { Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class UserToPost {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  public postId: string;

  @Field()
  @Column()
  public userId: string;

  @ManyToOne(() => Post, (post) => post.userToPost)
  public post: Post;

  @ManyToOne(() => User, (user) => user.userToPost)
  public user: User;
}
