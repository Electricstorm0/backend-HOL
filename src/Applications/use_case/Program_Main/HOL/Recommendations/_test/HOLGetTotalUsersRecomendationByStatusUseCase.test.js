/* eslint-disable no-undef */
const HOLGetTotalUsersRecomendationByStatusUseCase = require('../HOLGetTotalUsersRecomendationByStatusUseCase');

describe('HOLGetTotalUsersRecomendationByStatusUseCase', () => {
  let mockHolRecommendationsStatusRepository;
  let useCase;

  beforeEach(() => {
    mockHolRecommendationsStatusRepository = {
      readCountRecommendationByStatus: jest.fn(),
    };

    useCase = new HOLGetTotalUsersRecomendationByStatusUseCase({
      holRecommendationsStatusRepository: mockHolRecommendationsStatusRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get total users recommendation count by status correctly', async () => {
    // Arrange
    const expectedCount = 15;
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(expectedCount);

    const payload = {
      recommendationStatusId: 1, // Pending status
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 1,
    });

    expect(result).toBe(15);
  });

  it('should return zero when no recommendations found for status', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(0);

    const payload = {
      recommendationStatusId: 3, // Rejected status
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 3,
    });

    expect(result).toBe(0);
  });

  it('should handle different status IDs correctly', async () => {
    // Arrange
    const testCases = [
      { statusId: 1, expectedCount: 25 }, // Pending
      { statusId: 2, expectedCount: 18 }, // Approved
      { statusId: 3, expectedCount: 7 }, // Rejected
      { statusId: 4, expectedCount: 12 }, // Under Review
    ];

    for (const testCase of testCases) {
      mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(testCase.expectedCount);

      const payload = {
        recommendationStatusId: testCase.statusId,
      };

      // Act
      const result = await useCase.execute(payload);

      // Assert
      expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
        recommendationStatusId: testCase.statusId,
      });

      expect(result).toBe(testCase.expectedCount);

      // Clear mock untuk iterasi berikutnya
      jest.clearAllMocks();
    }
  });

  it('should handle large count numbers correctly', async () => {
    // Arrange
    const largeCount = 999999;
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(largeCount);

    const payload = {
      recommendationStatusId: 2, // Approved status
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 2,
    });

    expect(result).toBe(999999);
  });

  it('should handle repository errors properly', async () => {
    // Arrange
    const repositoryError = new Error('Database connection failed');
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockRejectedValue(repositoryError);

    const payload = {
      recommendationStatusId: 1,
    };

    // Act & Assert
    await expect(useCase.execute(payload)).rejects.toThrow('Database connection failed');

    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 1,
    });
  });

  it('should handle null/undefined recommendationStatusId', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(0);

    const payloadWithNull = {
      recommendationStatusId: null,
    };

    // Act
    const resultNull = await useCase.execute(payloadWithNull);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: null,
    });
    expect(resultNull).toBe(0);

    // Clear mock
    jest.clearAllMocks();

    // Test dengan undefined
    const payloadWithUndefined = {
      recommendationStatusId: undefined,
    };

    // Act
    const resultUndefined = await useCase.execute(payloadWithUndefined);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: undefined,
    });
    expect(resultUndefined).toBe(0);
  });

  it('should handle string recommendationStatusId', async () => {
    // Arrange
    const expectedCount = 42;
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(expectedCount);

    const payload = {
      recommendationStatusId: '2', // String instead of number
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: '2',
    });

    expect(result).toBe(42);
  });

  it('should handle repository returning null or undefined', async () => {
    // Arrange - Test null
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(null);

    const payload = {
      recommendationStatusId: 1,
    };

    // Act
    const resultNull = await useCase.execute(payload);

    // Assert
    expect(resultNull).toBeNull();

    // Clear mock
    jest.clearAllMocks();

    // Arrange - Test undefined
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(undefined);

    // Act
    const resultUndefined = await useCase.execute(payload);

    // Assert
    expect(resultUndefined).toBeUndefined();
  });

  it('should pass through repository result without modification', async () => {
    // Arrange
    const repositoryResult = 333;
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(repositoryResult);

    const payload = {
      recommendationStatusId: 5,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(result).toBe(repositoryResult);
    expect(result).toEqual(repositoryResult);

    // Memastikan tidak ada transformasi atau modifikasi data
    expect(typeof result).toBe('number');
  });
});
