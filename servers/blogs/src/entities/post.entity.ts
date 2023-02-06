import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostViews } from './post.views.entity';
import { User } from './user.entity';
import { UserToPost } from './user.post.entity';

export enum SegmentType {
  PROSPECT = 'prospect',
  LEAD = 'lead',
  CUSTOMER = 'customer',
  OTHER = 'other',
}

export enum PostStatus {
  PUBLISHED = 'Published',
  CREATED = 'created',
}

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
  @Column({ type: 'enum', enum: SegmentType, default: SegmentType.CUSTOMER })
  segmentType: string;

  @Field()
  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.CREATED })
  postStatus: string;

  @Field()
  @Column()
  userId: string;

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

  @ManyToOne(() => User, (user) => user.posts)
  @Field((type) => User)
  user: User;

  @OneToMany(() => UserToPost, (userToPost) => userToPost.post)
  public userToPost: UserToPost[];

  @OneToMany(() => PostViews, (postViews) => postViews.post)
  public postViews: PostViews[];
}
