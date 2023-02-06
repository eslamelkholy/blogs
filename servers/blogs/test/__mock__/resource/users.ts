import { randomUUID } from 'crypto';
import { User } from '../../../src/entities/user.entity';

export const usersList: User[] = [
  {
    email: 'eslam@gmail.com',
    id: randomUUID(),
    name: 'eslam',
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    email: 'eslam',
    id: randomUUID(),
    name: 'eslam',
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  }, // Not Valid Email
];
