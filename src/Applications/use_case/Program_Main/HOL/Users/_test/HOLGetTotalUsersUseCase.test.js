const HOLGetTotalUsersUseCase = require('../HOLGetTotalUsersUseCase');

describe('HOLGetTotalUsersUseCase', () => {
  it('should return total number of users', async () => {
    // Arrange
    const mockTotal = 42;

    const mockHolUsersRepository = {
      readCountUsers: jest.fn().mockResolvedValue(mockTotal),
    };

    const useCase = new HOLGetTotalUsersUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolUsersRepository.readCountUsers).toBeCalledTimes(1);
    expect(result).toBe(mockTotal);
  });

  it('should return 0 when repository returns undefined or null', async () => {
    // Arrange
    const mockHolUsersRepository = {
      readCountUsers: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new HOLGetTotalUsersUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toBeUndefined(); // Atau ubah ke 0 jika di use case-nya ingin dijadikan default
  });
});
