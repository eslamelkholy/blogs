import { Test, TestingModule } from '@nestjs/testing';
import { mockUserRepository } from '../__mock__/repository/mockUserRepository';
import { UserRepository } from '../../src/repositories/user.repository';
import { UserService } from '../../src/services/user.service';
import { CustomError } from '../../src/errors/custom.error';

describe('Service/UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('deleteUser', () => {
    it('Must throw error if user not exists', async () => {
      jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementation(() => null);

      expect(userService.getUserByEmail('email')).rejects.toThrowError(
        CustomError,
      );
    });
  });
});
