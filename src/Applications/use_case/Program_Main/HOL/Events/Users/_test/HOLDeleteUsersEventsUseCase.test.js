/* eslint-disable no-undef */
const HOLDeleteUsersEventsUseCase = require('../HOLDeleteUsersEventsUseCase');

describe('HOLDeleteUsersEventsUseCase', () => {
  it('should orchestrate the delete user event correctly', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      delete: jest.fn().mockResolvedValue({ message: 'deleted' }),
    };

    const useCase = new HOLDeleteUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const idParam = { id: 1 };

    // Act
    const result = await useCase.execute(idParam);

    // Assert
    expect(mockHolUsersEventsRepository.delete).toBeCalledWith({ id: 1 });
    expect(result).toEqual({ message: 'deleted' });
  });

  it('should throw error if repository throws', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      delete: jest.fn().mockRejectedValue(new Error('Database error')),
    };

    const useCase = new HOLDeleteUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const idParam = { id: 99 };

    // Act & Assert
    await expect(useCase.execute(idParam)).rejects.toThrow('Database error');
    expect(mockHolUsersEventsRepository.delete).toBeCalledWith({ id: 99 });
  });
});
