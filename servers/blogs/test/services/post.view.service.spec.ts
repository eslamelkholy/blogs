import { Test, TestingModule } from '@nestjs/testing';
import { PostViewService } from '../../src/services/post.views.service';
import { PostViewsRepository } from '../../src/repositories/post.views.repository';
import { mockPostViewsRepository } from '../__mock__/repository/mockPostViewsRepository';
import { mockNewPostViewDto } from '../__mock__/resource/mockNewPostViewDto';

describe('Service/PostViewService', () => {
  let postViewService: PostViewService;
  let postViewsRepository: PostViewsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostViewService,
        { provide: PostViewsRepository, useFactory: mockPostViewsRepository },
      ],
    }).compile();

    postViewService = module.get<PostViewService>(PostViewService);
    postViewsRepository = module.get<PostViewsRepository>(PostViewsRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCurrentPostViews', () => {
    it('Get current Post View for Specific user', async () => {
      await postViewService.getCurrentPostViews(mockNewPostViewDto);

      expect(postViewsRepository.getCurrentPostViews).toBeCalled();
    });
  });

  describe('addPostViews', () => {
    it('Must add new Post View For Specific Post', async () => {
      await postViewService.addPostViews(mockNewPostViewDto);

      expect(postViewsRepository.addPostViews).toBeCalled();
    });
  });
});
