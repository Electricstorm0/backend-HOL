const HOLGetTotalUsersByProgramUseCase = require('../HOLGetTotalUsersByProgramUseCase');

describe('HOLGetTotalUsersByProgramUseCase', () => {
  it('should return total users grouped by program', async () => {
    // Arrange
    const mockTotalUsers = [
      { program: 'Business Analytics', total: 10 },
      { program: 'Data Science', total: 7 },
    ];

    const mockHolUsersRepository = {
      readCountUsersByProgram: jest.fn().mockResolvedValue(mockTotalUsers),
    };

    const useCase = new HOLGetTotalUsersByProgramUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolUsersRepository.readCountUsersByProgram).toBeCalled();
    expect(result).toEqual(mockTotalUsers);
  });

  it('should return empty array when repository returns no data', async () => {
    // Arrange
    const mockHolUsersRepository = {
      readCountUsersByProgram: jest.fn().mockResolvedValue([]),
    };

    const useCase = new HOLGetTotalUsersByProgramUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual([]);
  });
});
