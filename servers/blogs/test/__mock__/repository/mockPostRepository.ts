export const mockPostRepository = () => ({
  createPost: jest.fn(),
  getPosts: jest.fn(),
  newPostView: jest.fn(),
  getProfilePosts: jest.fn(),
  publishPosts: jest.fn(),
  timelineQuery: jest.fn(),
});
