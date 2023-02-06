import { randomUUID } from 'crypto';
import { CreatePostDto } from '../../../src/dtos/post.dto';
import { cachedUUID } from './cacheUUID';

export const mockCreatePostDto: CreatePostDto = {
  segmentType: 'customer',
  subTitle: 'subTitle',
  text: 'Textttttttttttt',
  title: 'Titleeeeeeeee',
  userId: cachedUUID,
  userIds: [cachedUUID],
};
