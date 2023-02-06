import { UserToPost } from '../../../src/entities/user.post.entity';
import { cachedUUID } from './cacheUUID';

export const mockUserToPost: UserToPost[] = [
  {
    postId: cachedUUID,
    userId: cachedUUID,
  },
];
