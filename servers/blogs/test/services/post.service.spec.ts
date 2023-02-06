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
import {
  mockCreatePostDto,
  mockCreatePostDtoOther,
} from '../__mock__/resource/mockCreatePostDto';
import { mockPageOptionsDto } from '../__mock__/resource/mockPageOptionsDto';
import { CustomError } from '../../src/errors/custom.error';
import { usersList } from '../__mock__/resource/users';
import { cachedUUID } from '../__mock__/resource/cacheUUID';
import { mockPostViews } from '../__mock__/resource/mockPostViews';

describe('Service/PostService', () => {
  let postService: PostService;
  let postRepository: PostRepository;
  let userService: UserService;
  let userPostService: UserPostService;
  let postViewService: PostViewService;

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
    userPostService = module.get<UserPostService>(UserPostService);
    postViewService = module.get<PostViewService>(PostViewService);
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
    it('Creates Post and assign it to Specific user if Type is Other', async () => {
      jest
        .spyOn(userService, 'getUserById')
        .mockImplementation(() => Promise.resolve(null));

      jest
        .spyOn(userPostService, 'createUserPosts')
        .mockImplementation(() => Promise.resolve(null));

      await postService.createPost(mockCreatePostDtoOther);

      expect(postRepository.createPost).toBeCalled();
      expect(userPostService.createUserPosts).toBeCalled();
    });
  });

  describe('getPosts', () => {
    it('Throws an error if User id is not Provided', async () => {
      expect(
        postService.getPosts(mockPageOptionsDto, undefined),
      ).rejects.toThrowError(CustomError);
    });

    it('Returns user Timeline Posts Paginated', async () => {
      jest
        .spyOn(userService, 'getUserById')
        .mockImplementation(() => Promise.resolve(usersList[0]));

      await postService.getPosts(mockPageOptionsDto, cachedUUID);

      expect(postRepository.getPosts).toBeCalled();
    });
  });

  describe('getProfilePosts', () => {
    it('Throws an error if User id is not Provided', async () => {
      expect(
        postService.getProfilePosts(mockPageOptionsDto, undefined),
      ).rejects.toThrowError(CustomError);
    });

    it('Returns admin Profile Posts', async () => {
      jest
        .spyOn(userService, 'getUserById')
        .mockImplementation(() => Promise.resolve(usersList[0]));
      await postService.getProfilePosts(mockPageOptionsDto, cachedUUID);

      expect(postRepository.getProfilePosts).toBeCalled();
    });
  });

  describe('publishPosts', () => {
    it('Publish all Posts by Changing status to be Published', async () => {
      await postService.publishPosts();
    });
  });

  describe('newPostView', () => {
    it('Saves page Views once User clicked on the Post', async () => {
      jest
        .spyOn(postViewService, 'getCurrentPostViews')
        .mockImplementation(() => Promise.resolve(null));

      jest
        .spyOn(postViewService, 'addPostViews')
        .mockImplementation(() => Promise.resolve(mockPostViews[0]));

      await postService.newPostView(mockPostViews[0]);

      expect(postRepository.newPostView).toBeCalled();
      expect(postRepository.newPostView).toBeCalledTimes(1);
    });

    it('Not Saving Post view if user already viewed it', async () => {
      jest
        .spyOn(postViewService, 'getCurrentPostViews')
        .mockImplementation(() => Promise.resolve(mockPostViews[0]));

      await postService.newPostView(mockPostViews[0]);

      expect(postRepository.newPostView).toBeCalledTimes(0);
    });
  });
});
