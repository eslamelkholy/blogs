import { Test, TestingModule } from '@nestjs/testing';
import { UserPostService } from '../../src/services/user.post.service';
import { UserPostRepository } from '../../src/repositories/user.post.repository';
import { mockUserToPost } from '../__mock__/resource/mockUserToPost';
import { mockCreatePostDto } from '../__mock__/resource/mockCreatePostDto';
import { mockPost } from '../__mock__/resource/mockPost';
import { mockUserPostRepository } from '../__mock__/repository/mockUserPostRepository';

describe('Service/UserPostService', () => {
  let userPostService: UserPostService;
  let userPostRepository: UserPostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPostService,
        { provide: UserPostRepository, useFactory: mockUserPostRepository },
      ],
    }).compile();

    userPostService = module.get<UserPostService>(UserPostService);
    userPostRepository = module.get<UserPostRepository>(UserPostRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUserPosts', () => {
    it('Bulk insert Posts into DB', async () => {
      jest
        .spyOn(userPostService, 'prepareUserPostData')
        .mockImplementation(() => mockUserToPost);

      await userPostService.createUserPosts(mockCreatePostDto, mockPost[0]);
      expect(userPostRepository.bulkInsert).toBeCalled();
    });
  });

  describe('prepareUserPostData', () => {
    it('Prepares User Post Data for Bulk Insert', async () => {
      expect(
        userPostService.prepareUserPostData(mockCreatePostDto, mockPost[0]),
      ).toEqual([mockUserToPost[0]]);
    });
  });
});
