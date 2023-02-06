import { UserResponse } from '../../../src/dtos/user.dto';
import { usersList } from './users';

export const mockUserResponse: UserResponse = {
  pagination: {
    hasNextPage: true,
    hasPreviousPage: false,
    itemCount: 10,
    page: 1,
    pageCount: 10,
    take: 1,
  },
  entities: usersList,
};
