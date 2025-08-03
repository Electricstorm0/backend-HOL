/* eslint-disable no-undef */
const HOLCreateUsersWorkExpUseCase = require('../HOLCreateUsersWorkExpUseCase');

describe('HOLCreateUsersWorkExpUseCase', () => {
  const userParam = { id: 101 };
  const payload = {
    companyName: 'Tech Corp',
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    position: 'Software Engineer',
  };

  it('should call repository create with correct arguments (happy path)', async () => {
    const mockRepository = {
      create: jest.fn(),
    };

    const useCase = new HOLCreateUsersWorkExpUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    await useCase.execute(userParam, payload);

    expect(mockRepository.create).toBeCalledWith({
      usersId: 101,
      companyName: 'Tech Corp',
      startDate: '2023-01-01',
      endDate: '2024-01-01',
      position: 'Software Engineer',
    });
  });

  it('should throw error if repository.create fails', async () => {
    const mockRepository = {
      create: jest.fn().mockRejectedValue(new Error('DB error')),
    };

    const useCase = new HOLCreateUsersWorkExpUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    await expect(useCase.execute(userParam, payload)).rejects.toThrow('DB error');
    expect(mockRepository.create).toBeCalled();
  });
});
