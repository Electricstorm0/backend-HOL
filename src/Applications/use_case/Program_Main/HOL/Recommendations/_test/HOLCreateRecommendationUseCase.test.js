/* eslint-disable no-undef */
const HOLCreateRecommendationUseCase = require('../HOLCreateRecommendationUseCase');
const usersScore = require('../../../../../../Domains/program_main/hol/users/entities/dummy/UsersScores');

jest.mock('../../../../../../Domains/program_main/hol/users/entities/dummy/UsersScores');

describe('HOLCreateRecommendationUseCase', () => {
  let mockHolRecommendationsRepository;
  let mockHolRecommendationsStatusRepository;
  let useCase;

  beforeEach(() => {
    mockHolRecommendationsRepository = {
      create: jest.fn(),
    };

    mockHolRecommendationsStatusRepository = {
      create: jest.fn(),
    };

    useCase = new HOLCreateRecommendationUseCase({
      holRecommendationsRepository: mockHolRecommendationsRepository,
      holRecommendationsStatusRepository: mockHolRecommendationsStatusRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create recommendation successfully when user score meets minimum criteria', async () => {
    // Arrange
    const mockUsersScore = [
      { usersId: 1, score: 90 },
      { usersId: 2, score: 75 },
      { usersId: 3, score: 85 },
    ];

    usersScore.find = jest.fn().mockReturnValue({ usersId: 1, score: 90 });

    const recommendationId = 'rec-123';
    mockHolRecommendationsRepository.create.mockResolvedValue(recommendationId);
    mockHolRecommendationsStatusRepository.create.mockResolvedValue();

    const params = { id: 1 };
    const payload = {
      institutions: 'Universitas Indonesia',
      purposes: 'Melanjutkan studi S2',
      deadline: '2024-12-31',
      details: 'Detail rekomendasi untuk program magister',
    };

    // Act
    await useCase.execute(params, payload);

    // Assert
    expect(usersScore.find).toHaveBeenCalledWith(expect.any(Function));
    expect(mockHolRecommendationsRepository.create).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 1,
      institutions: 'Universitas Indonesia',
      purposes: 'Melanjutkan studi S2',
      deadline: '2024-12-31',
      details: 'Detail rekomendasi untuk program magister',
    });
    expect(mockHolRecommendationsStatusRepository.create).toHaveBeenCalledWith({
      HOLRecommendationId: recommendationId,
      isChecked: 0,
    });
  });

  it('should create recommendation successfully when user score equals minimum criteria (85)', async () => {
    // Arrange
    usersScore.find = jest.fn().mockReturnValue({ usersId: 3, score: 85 });

    const recommendationId = 'rec-456';
    mockHolRecommendationsRepository.create.mockResolvedValue(recommendationId);
    mockHolRecommendationsStatusRepository.create.mockResolvedValue();

    const params = { id: 3 };
    const payload = {
      institutions: 'Institut Teknologi Bandung',
      purposes: 'Beasiswa penelitian',
      deadline: '2024-11-30',
      details: 'Rekomendasi untuk program beasiswa',
    };

    // Act
    await useCase.execute(params, payload);

    // Assert
    expect(usersScore.find).toHaveBeenCalledWith(expect.any(Function));
    expect(mockHolRecommendationsRepository.create).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 3,
      institutions: 'Institut Teknologi Bandung',
      purposes: 'Beasiswa penelitian',
      deadline: '2024-11-30',
      details: 'Rekomendasi untuk program beasiswa',
    });
    expect(mockHolRecommendationsStatusRepository.create).toHaveBeenCalledWith({
      HOLRecommendationId: recommendationId,
      isChecked: 0,
    });
  });

  it('should throw error when user score is below minimum criteria', async () => {
    // Arrange
    usersScore.find = jest.fn().mockReturnValue({ usersId: 2, score: 75 });

    const params = { id: 2 };
    const payload = {
      institutions: 'Universitas Gadjah Mada',
      purposes: 'Program pertukaran mahasiswa',
      deadline: '2024-10-15',
      details: 'Rekomendasi untuk program exchange',
    };

    // Act & Assert
    await expect(useCase.execute(params, payload)).rejects.toThrow('Mohon maaf nilai anda tidak memenuhi kriteria minimum 85');

    expect(usersScore.find).toHaveBeenCalledWith(expect.any(Function));
    expect(mockHolRecommendationsRepository.create).not.toHaveBeenCalled();
    expect(mockHolRecommendationsStatusRepository.create).not.toHaveBeenCalled();
  });

  it('should throw error when user score is exactly below minimum (84)', async () => {
    // Arrange
    usersScore.find = jest.fn().mockReturnValue({ usersId: 4, score: 84 });

    const params = { id: 4 };
    const payload = {
      institutions: 'Universitas Padjadjaran',
      purposes: 'Program magang',
      deadline: '2024-09-30',
      details: 'Rekomendasi untuk program internship',
    };

    // Act & Assert
    await expect(useCase.execute(params, payload)).rejects.toThrow('Mohon maaf nilai anda tidak memenuhi kriteria minimum 85');

    expect(usersScore.find).toHaveBeenCalledWith(expect.any(Function));
    expect(mockHolRecommendationsRepository.create).not.toHaveBeenCalled();
    expect(mockHolRecommendationsStatusRepository.create).not.toHaveBeenCalled();
  });

  it('should handle repository errors properly', async () => {
    // Arrange
    usersScore.find = jest.fn().mockReturnValue({ usersId: 5, score: 86 });

    const repositoryError = new Error('Database connection failed');
    mockHolRecommendationsRepository.create.mockRejectedValue(repositoryError);

    const params = { id: 5 };
    const payload = {
      institutions: 'Universitas Airlangga',
      purposes: 'Program PhD',
      deadline: '2025-01-15',
      details: 'Rekomendasi untuk program doktoral',
    };

    // Act & Assert
    await expect(useCase.execute(params, payload)).rejects.toThrow('Database connection failed');

    expect(usersScore.find).toHaveBeenCalledWith(expect.any(Function));
    expect(mockHolRecommendationsRepository.create).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 5,
      institutions: 'Universitas Airlangga',
      purposes: 'Program PhD',
      deadline: '2025-01-15',
      details: 'Rekomendasi untuk program doktoral',
    });
    expect(mockHolRecommendationsStatusRepository.create).not.toHaveBeenCalled();
  });

  it('should handle status repository errors properly', async () => {
    // Arrange
    usersScore.find = jest.fn().mockReturnValue({ usersId: 6, score: 88 });

    const recommendationId = 'rec-789';
    mockHolRecommendationsRepository.create.mockResolvedValue(recommendationId);

    const statusRepositoryError = new Error('Status creation failed');
    mockHolRecommendationsStatusRepository.create.mockRejectedValue(statusRepositoryError);

    const params = { id: 6 };
    const payload = {
      institutions: 'Universitas Diponegoro',
      purposes: 'Program penelitian',
      deadline: '2024-12-01',
      details: 'Rekomendasi untuk program riset',
    };

    // Act & Assert
    await expect(useCase.execute(params, payload)).rejects.toThrow('Status creation failed');

    expect(usersScore.find).toHaveBeenCalledWith(expect.any(Function));
    expect(mockHolRecommendationsRepository.create).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 6,
      institutions: 'Universitas Diponegoro',
      purposes: 'Program penelitian',
      deadline: '2024-12-01',
      details: 'Rekomendasi untuk program riset',
    });
    expect(mockHolRecommendationsStatusRepository.create).toHaveBeenCalledWith({
      HOLRecommendationId: recommendationId,
      isChecked: 0,
    });
  });
});
