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

export const mockCreatePostDtoOther: CreatePostDto = {
  segmentType: 'other',
  subTitle: 'subTitle',
  text: 'Textttttttttttt',
  title: 'Titleeeeeeeee',
  userId: cachedUUID,
  userIds: [cachedUUID],
};
