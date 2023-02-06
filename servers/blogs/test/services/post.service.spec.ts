import { Test, TestingModule } from '@nestjs/testing';
import { PostViewService } from '../../src/services/post.views.service';
import { PostService } from '../../src/services/post.service';
import { PostRepository } from '../../src/repositories/post.repository';
import { mockPostRepository } from '../__mock__/repository/mockPostRepository';
import { UserPostService } from '../../src/services/user.post.service';
import { mockPostViewsRepository } from '../__mock__/repository/mockPostViewsRepository';
import { PostViewsRepository } from '../../src/repositories/post.views.repository';
import { mockUserPostRepository } from '../__mock__/repository/mockUserPostRepository';
import { UserPostRepository } from '../../src/repositories/user.post.repository';
import { mockUserRepository } from '../__mock__/repository/mockUserRepository';
import { UserRepository } from '../../src/repositories/user.repository';
import { UserService } from '../../src/services/user.service';
import { mockCreatePostDto } from '../__mock__/resource/mockCreatePostDto';

describe('Service/PostViewService', () => {
  let postService: PostService;
  let postRepository: PostRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        UserPostService,
        PostViewService,
        UserService,
        { provide: PostRepository, useFactory: mockPostRepository },
        { provide: UserPostRepository, useFactory: mockUserPostRepository },
        { provide: PostViewsRepository, useFactory: mockPostViewsRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createPost', () => {
    it('Creates Post for Specific Segment', async () => {
      jest
        .spyOn(userService, 'getUserById')
        .mockImplementation(() => Promise.resolve(null));

      await postService.createPost(mockCreatePostDto);

      expect(postRepository.createPost).toBeCalled();
    });
  });
});
