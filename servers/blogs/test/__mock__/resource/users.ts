import { randomUUID } from 'crypto';
import { User } from '../../../src/entities/user.entity';

export const usersList: User[] = [
  { email: 'eslam@gmail.com', id: randomUUID(), name: 'eslam', role: 'admin' },
];
