/* eslint-disable no-undef */
const HOLGetTotalUsersRecomendationUseCase = require('../HOLGetTotalUsersRecomendationUseCase');

describe('HOLGetTotalUsersRecomendationUseCase', () => {
  let mockHolRecommendationsStatusRepository;
  let useCase;

  beforeEach(() => {
    mockHolRecommendationsStatusRepository = {
      readCountRecommendation: jest.fn(),
    };

    useCase = new HOLGetTotalUsersRecomendationUseCase({
      holRecommendationsStatusRepository: mockHolRecommendationsStatusRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get total users recommendation count correctly', async () => {
    // Arrange
    const expectedCount = 125;
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(expectedCount);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBe(125);
  });

  it('should return zero when no recommendations exist', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(0);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBe(0);
  });

  it('should handle large count numbers correctly', async () => {
    // Arrange
    const largeCount = 1500000;
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(largeCount);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBe(1500000);
  });

  it('should handle repository errors properly', async () => {
    // Arrange
    const repositoryError = new Error('Database connection timeout');
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockRejectedValue(repositoryError);

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow('Database connection timeout');

    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
  });

  it('should handle repository returning null', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(null);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBeNull();
  });

  it('should handle repository returning undefined', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(undefined);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBeUndefined();
  });

  it('should pass through repository result without modification', async () => {
    // Arrange
    const repositoryResult = 750;
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(repositoryResult);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toBe(repositoryResult);
    expect(result).toEqual(repositoryResult);

    // Memastikan tidak ada transformasi atau modifikasi data
    expect(typeof result).toBe('number');
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple consecutive calls correctly', async () => {
    // Arrange
    const counts = [100, 150, 200];
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValueOnce(counts[0]).mockResolvedValueOnce(counts[1]).mockResolvedValueOnce(counts[2]);

    // Act
    const result1 = await useCase.execute();
    const result2 = await useCase.execute();
    const result3 = await useCase.execute();

    // Assert
    expect(result1).toBe(100);
    expect(result2).toBe(150);
    expect(result3).toBe(200);
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledTimes(3);
  });

  it('should handle decimal numbers from repository', async () => {
    // Arrange
    const decimalCount = 42.5; // Unlikely but possible
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(decimalCount);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBe(42.5);
    expect(typeof result).toBe('number');
  });

  it('should handle repository returning string number', async () => {
    // Arrange
    const stringCount = '88'; // Repository could potentially return string
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(stringCount);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBe('88');
    expect(typeof result).toBe('string');
  });

  it('should not accept any parameters', async () => {
    // Arrange
    const expectedCount = 99;
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(expectedCount);

    // Act - trying to pass parameters (should be ignored)
    const result = await useCase.execute({ someParam: 'value' });

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
    expect(result).toBe(99);

    // Memastikan repository dipanggil tanpa parameter
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
  });

  it('should handle async repository operation correctly', async () => {
    // Arrange
    const mockPromise = new Promise((resolve) => {
      setTimeout(() => resolve(500), 100);
    });
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockReturnValue(mockPromise);

    // Act
    const startTime = Date.now();
    const result = await useCase.execute();
    const endTime = Date.now();

    // Assert
    expect(result).toBe(500);
    expect(endTime - startTime).toBeGreaterThanOrEqual(95); // Allow some margin for timing
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalledWith();
  });
});
