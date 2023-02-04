import { Test, TestingModule } from '@nestjs/testing';
import { mockUserRepository } from '../__mock__/repository/mockUserRepository';
import { UserRepository } from '../../src/repositories/user.repository';
import { UserService } from '../../src/services/user.service';
import { CustomError } from '../../src/errors/custom.error';
import { usersList } from '../__mock__/resource/users';
import { CreateUserDto } from '../../src/dtos/user.dto';

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
    it('throws error if user not exists', async () => {
      jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementation(() => null);

      expect(userService.getUserByEmail('email')).rejects.toThrowError(
        CustomError,
      );
    });

    it('Delete User if User Exists', async () => {
      jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementation(() => Promise.resolve(usersList[0]));
      await userService.deleteUser('user');

      expect(userRepository.deleteUser).toBeCalled();
    });
  });

  describe('createUser', () => {
    it('Creates User if user not Exists ', async () => {
      jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementation(() => null);

      await userService.createUser(usersList[0] as CreateUserDto);

      expect(userRepository.createUser).toBeCalled();
    });

    it('Throws User if user Exists ', async () => {
      jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementation(() => Promise.resolve(usersList[0]));

      expect(
        userService.createUser(usersList[0] as CreateUserDto),
      ).rejects.toThrowError(CustomError);
    });
  });
});
