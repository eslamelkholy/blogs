export const mockUserRepository = () => ({
  findAll: jest.fn(),
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
  deleteUser: jest.fn(),
  getUserById: jest.fn(),
  userSearch: jest.fn(),
});
