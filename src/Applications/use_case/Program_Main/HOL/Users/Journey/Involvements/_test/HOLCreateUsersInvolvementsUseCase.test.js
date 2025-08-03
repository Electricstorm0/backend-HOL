/* eslint-disable no-undef */
const HOLCreateUsersInvolvementsUseCase = require('../HOLCreateUsersInvolvementsUseCase');
const InvariantError = require('../../../../../../../../Commons/exceptions/InvariantError');

describe('HOLCreateUsersInvolvementsUseCase', () => {
  const payload = {
    usersEventsHOLId: 101,
    usersId: 202,
  };

  it('should create involvement if not registered yet', async () => {
    const mockRepository = {
      readByUsersEventsId: jest.fn().mockResolvedValue(null), // Belum ada
      create: jest.fn().mockResolvedValue(),
    };

    const useCase = new HOLCreateUsersInvolvementsUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    await useCase.execute(payload);

    expect(mockRepository.readByUsersEventsId).toBeCalledWith({ usersEventsHOLId: 101 });
    expect(mockRepository.create).toBeCalledWith({
      usersEventsHOLId: 101,
      usersId: 202,
    });
  });

  it('should throw InvariantError if involvement already registered', async () => {
    const mockRepository = {
      readByUsersEventsId: jest.fn().mockResolvedValue({ id: 1 }), // Sudah ada
      create: jest.fn(),
    };

    const useCase = new HOLCreateUsersInvolvementsUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    await expect(useCase.execute(payload)).rejects.toThrow(InvariantError);
    expect(mockRepository.readByUsersEventsId).toBeCalledWith({ usersEventsHOLId: 101 });
    expect(mockRepository.create).not.toBeCalled();
  });
});
