import { PostViews } from '../../../src/entities/post.views.entity';
import { cachedUUID } from './cacheUUID';

export const mockPostViews: PostViews[] = [
  {
    postId: cachedUUID,
    userId: cachedUUID,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
