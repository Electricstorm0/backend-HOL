/* eslint-disable no-undef */
const HOLGetUsersInvolvementssByIdUseCase = require('../HOLGetUsersInvolvementsByIdUseCase');

describe('HOLGetUsersInvolvementssByIdUseCase', () => {
  const idParam = { id: 101 };

  it('should return user involvement data when repository returns data', async () => {
    // Arrange
    const dummyInvolvements = [
      {
        usersEventsHOLId: 201,
        usersId: 101,
        detail: 'Involved as speaker',
      },
    ];

    const mockRepository = {
      readById: jest.fn().mockResolvedValue(dummyInvolvements),
    };

    const useCase = new HOLGetUsersInvolvementssByIdUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    // Act
    const result = await useCase.execute(idParam);

    // Assert
    expect(mockRepository.readById).toBeCalledWith({ usersHOLId: 101 });
    expect(result).toEqual(dummyInvolvements);
  });

  it('should return empty array when repository returns null', async () => {
    const mockRepository = {
      readById: jest.fn().mockResolvedValue(null),
    };

    const useCase = new HOLGetUsersInvolvementssByIdUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);

    expect(mockRepository.readById).toBeCalledWith({ usersHOLId: 101 });
    expect(result).toEqual([]);
  });
});
