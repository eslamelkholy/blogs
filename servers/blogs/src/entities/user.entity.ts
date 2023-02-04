import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
