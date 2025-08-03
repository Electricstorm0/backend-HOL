/* eslint-disable no-undef */
const HOLDeleteUsersUseCase = require('../HOLDeleteUsersUseCase');

describe('HOLDeleteUsersUseCase', () => {
  it('should call repository delete function with correct id', async () => {
    // Arrange
    const mockHolUsersRepository = {
      delete: jest.fn().mockResolvedValue({ success: true }),
    };

    const useCase = new HOLDeleteUsersUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    const payload = { id: 123 };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolUsersRepository.delete).toBeCalledWith({ id: 123 });
    expect(result).toEqual({ success: true });
  });

  it('should throw error if repository throws', async () => {
    const mockHolUsersRepository = {
      delete: jest.fn().mockRejectedValue(new Error('DB Error')),
    };

    const useCase = new HOLDeleteUsersUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    await expect(useCase.execute({ id: 123 })).rejects.toThrow('DB Error');
  });
});
