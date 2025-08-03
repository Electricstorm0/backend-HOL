/* eslint-disable no-undef */
const HOLCreateUsersAchievementsUseCase = require('../HOLCreateUsersAchievementsUseCase');

describe('HOLCreateUsersAchievementsUseCase', () => {
  const payload = {
    usersId: 10,
    eventsName: 'IYSF',
    eventsYear: 2024,
    bcfContribution: 'Volunteer',
    achievements: 'Best Poster Award',
  };

  it('should orchestrate creating user achievements correctly', async () => {
    // Arrange
    const mockRepository = {
      create: jest.fn().mockResolvedValue(),
    };

    const useCase = new HOLCreateUsersAchievementsUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockRepository.create).toBeCalledWith({
      usersId: 10,
      eventsName: 'IYSF',
      eventsYear: 2024,
      bcfContribution: 'Volunteer',
      achievements: 'Best Poster Award',
    });
    expect(mockRepository.create).toBeCalledTimes(1);
  });

  it('should throw error when repository.create fails', async () => {
    // Arrange
    const mockRepository = {
      create: jest.fn().mockRejectedValue(new Error('Database error')),
    };

    const useCase = new HOLCreateUsersAchievementsUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    // Act & Assert
    await expect(useCase.execute(payload)).rejects.toThrow('Database error');
    expect(mockRepository.create).toBeCalledWith(payload);
  });
});
