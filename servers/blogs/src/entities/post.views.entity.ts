import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
@Index(['postId', 'userId'], { unique: true })
export class PostViews {
  @Field()
  @Column()
  @PrimaryColumn()
  public postId: string;

  @Field()
  @Column()
  @PrimaryColumn()
  public userId: string;

  @ManyToOne(() => Post, (post) => post.postViews)
  public post?: Post;

  @ManyToOne(() => User, (user) => user.postViews)
  public user?: User;

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
}
