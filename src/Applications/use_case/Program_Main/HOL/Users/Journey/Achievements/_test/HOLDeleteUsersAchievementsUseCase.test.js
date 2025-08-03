/* eslint-disable no-undef */
const HOLDeleteUsersAchievementsUseCase = require('../HOLDeleteUsersAchievementsUseCase');

describe('HOLDeleteUsersAchievementsUseCase', () => {
  const idParam = { id: 123 };

  it('should orchestrate the delete users achievement correctly', async () => {
    // Arrange
    const mockRepository = {
      delete: jest.fn().mockResolvedValue({ success: true }),
    };

    const useCase = new HOLDeleteUsersAchievementsUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    // Act
    const result = await useCase.execute(idParam);

    // Assert
    expect(mockRepository.delete).toBeCalledWith({ id: 123 });
    expect(result).toEqual({ success: true });
  });

  it('should throw error when repository.delete fails', async () => {
    // Arrange
    const mockRepository = {
      delete: jest.fn().mockRejectedValue(new Error('Database error')),
    };

    const useCase = new HOLDeleteUsersAchievementsUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    // Act & Assert
    await expect(useCase.execute(idParam)).rejects.toThrow('Database error');
    expect(mockRepository.delete).toBeCalledWith({ id: 123 });
  });
});
