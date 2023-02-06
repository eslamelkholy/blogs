import { randomUUID } from 'crypto';
import { Post } from 'src/entities/post.entity';
import { cachedUUID } from './cacheUUID';

export const mockPost: Post[] = [
  {
    segmentType: 'customer',
    subTitle: 'subTitle',
    text: 'Textttttttttttt',
    title: 'Titleeeeeeeee',
    postStatus: 'created',
    created_at: new Date(),
    updated_at: new Date(),
    totalPostViews: 0,
    id: cachedUUID,
    userId: cachedUUID,
  },
];
