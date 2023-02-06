import { NewPostViewDto } from '../../../src/dtos/post.dto';
import { cachedUUID } from './cacheUUID';

export const mockNewPostViewDto: NewPostViewDto = {
  postId: cachedUUID,
  userId: cachedUUID,
};
