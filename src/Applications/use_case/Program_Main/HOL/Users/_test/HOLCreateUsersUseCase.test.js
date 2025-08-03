/* eslint-disable no-undef */
const HOLCreateUsersUseCase = require('../HOLCreateUsersUseCase');
const HOLAddUsers = require('../../../../../../Domains/program_main/hol/users/entities/HOLAddUsers');
const InvariantError = require('../../../../../../Commons/exceptions/InvariantError');

// Mock entity
jest.mock('../../../../../../Domains/program_main/hol/users/entities/HOLAddUsers');

describe('HOLCreateUsersUseCase', () => {
  const payload = {
    fullname: 'John Doe',
    email: 'john@example.com',
    password: 'secret',
    batchId: 1,
    thirdTierProgramId: 2,
  };

  const mockRepositories = {
    usersRepository: {
      verifyAvailableEmail: jest.fn(),
      create: jest.fn(),
    },
    usersDetailRepository: {
      create: jest.fn(),
    },
    passwordHash: {
      hash: jest.fn(),
    },
    offeredProgramRepository: {
      create: jest.fn(),
    },
    holUsersRepository: {
      create: jest.fn(),
    },
    usersDomicileRepository: {
      create: jest.fn(),
    },
    usersUniversitiesRepository: {
      create: jest.fn(),
    },
    clpUsersRepository: {
      create: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    HOLAddUsers.mockImplementation((data) => data);
  });

  it('should orchestrate the user creation process correctly', async () => {
    mockRepositories.usersRepository.verifyAvailableEmail.mockResolvedValue(false);
    mockRepositories.passwordHash.hash.mockResolvedValue('hashed-password');
    mockRepositories.usersRepository.create.mockResolvedValue({ id: 123 });

    const useCase = new HOLCreateUsersUseCase(mockRepositories);
    const result = await useCase.execute(payload);

    expect(mockRepositories.usersRepository.verifyAvailableEmail).toBeCalledWith({ email: 'john@example.com' });
    expect(mockRepositories.passwordHash.hash).toBeCalledWith('secret');
    expect(mockRepositories.usersRepository.create).toBeCalledWith({
      username: 'john',
      email: 'john@example.com',
      password: 'hashed-password',
    });

    expect(mockRepositories.usersDetailRepository.create).toBeCalledWith({
      usersId: 123,
      cardIdNumber: '-',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(result).toEqual({
      usersId: 123,
      fullname: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should throw error when email is already used', async () => {
    mockRepositories.usersRepository.verifyAvailableEmail.mockResolvedValue(true);

    const useCase = new HOLCreateUsersUseCase(mockRepositories);

    await expect(useCase.execute(payload)).rejects.toThrow(new InvariantError(`${payload.fullname}, email anda ${payload.email} sudah terdaftar!`));
  });

  it('should throw error when payload does not contain needed property', async () => {
    HOLAddUsers.mockImplementation(() => {
      throw new Error('HOL_ADD_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLCreateUsersUseCase(mockRepositories);

    await expect(useCase.execute({})).rejects.toThrow('HOL_ADD_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type specification', async () => {
    HOLAddUsers.mockImplementation(() => {
      throw new Error('HOL_ADD_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    const useCase = new HOLCreateUsersUseCase(mockRepositories);

    await expect(
      useCase.execute({
        fullname: 123,
        email: true,
        password: {},
        batchId: 1,
        thirdTierProgramId: 2,
      })
    ).rejects.toThrow('HOL_ADD_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should call clpUsersRepository.create if thirdTierProgramId is 1, 2, or 3', async () => {
    const idsToTest = [1, 2, 3];

    for (const thirdTierProgramId of idsToTest) {
      const testPayload = {
        ...payload,
        thirdTierProgramId,
      };

      mockRepositories.usersRepository.verifyAvailableEmail.mockResolvedValue(false);
      mockRepositories.passwordHash.hash.mockResolvedValue('hashed-password');
      mockRepositories.usersRepository.create.mockResolvedValue({ id: 123 });

      const useCase = new HOLCreateUsersUseCase(mockRepositories);
      await useCase.execute(testPayload);

      expect(mockRepositories.clpUsersRepository.create).toHaveBeenLastCalledWith({
        usersId: 123,
        batchId: testPayload.batchId,
      });

      jest.clearAllMocks(); // reset call history untuk next iteration
    }
  });

  it('should NOT call clpUsersRepository.create if thirdTierProgramId is not 1, 2, or 3', async () => {
    const testPayload = {
      ...payload,
      thirdTierProgramId: 4,
    };

    mockRepositories.usersRepository.verifyAvailableEmail.mockResolvedValue(false);
    mockRepositories.passwordHash.hash.mockResolvedValue('hashed-password');
    mockRepositories.usersRepository.create.mockResolvedValue({ id: 123 });

    const useCase = new HOLCreateUsersUseCase(mockRepositories);
    await useCase.execute(testPayload);

    expect(mockRepositories.clpUsersRepository.create).not.toHaveBeenCalled();
  });
});
