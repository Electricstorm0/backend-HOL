/* eslint-disable no-undef */
const HOLGetRecommendationByUserIdUseCase = require('../HOLGetRecommendationByUserIdUseCase');
const getRecommendation = require('../../../../../../Domains/program_main/hol/recommendations/entities/GetRecommendations');

jest.mock('../../../../../../Domains/program_main/hol/recommendations/entities/GetRecommendations');

describe('HOLGetRecommendationByUserIdUseCase', () => {
  let mockHolRecommendationsRepository;
  let useCase;

  beforeEach(() => {
    mockHolRecommendationsRepository = {
      readByUserId: jest.fn(),
    };

    useCase = new HOLGetRecommendationByUserIdUseCase({
      holRecommendationsRepository: mockHolRecommendationsRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get recommendations by user id correctly', async () => {
    // Arrange
    const mockRecommendations = [
      {
        id: 1,
        id_hol_users_recommendations: 123,
        institutions: 'Universitas Indonesia',
        pusposes: 'Melanjutkan studi S2',
        deadline: '2024-12-31',
        details: 'Detail rekomendasi untuk program magister',
        created_at: new Date('2024-01-15'),
        status: 'Pending',
      },
      {
        id: 2,
        id_hol_users_recommendations: 123,
        institutions: 'Institut Teknologi Bandung',
        pusposes: 'Beasiswa penelitian',
        deadline: '2024-11-30',
        details: 'Rekomendasi untuk program beasiswa',
        created_at: new Date('2024-02-20'),
        status: 'Approved',
      },
    ];

    mockHolRecommendationsRepository.readByUserId.mockResolvedValue(mockRecommendations);

    // Mock class constructor to return transformed payload
    getRecommendation.mockImplementation((payload) => ({
      recommendationId: payload.id,
      usersRecommendationId: payload.id_hol_users_recommendations,
      institutions: payload.institutions,
      purposes: payload.pusposes,
      deadline: payload.deadline,
      detail: payload.details,
      tanggal_pengajuan: payload.created_at,
      status: payload.status,
    }));

    const params = { id: 123 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(mockHolRecommendationsRepository.readByUserId).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 123,
    });

    expect(result).toEqual([
      {
        recommendationId: 1,
        usersRecommendationId: 123,
        institutions: 'Universitas Indonesia',
        purposes: 'Melanjutkan studi S2',
        deadline: '2024-12-31',
        detail: 'Detail rekomendasi untuk program magister',
        tanggal_pengajuan: new Date('2024-01-15'),
        status: 'Pending',
      },
      {
        recommendationId: 2,
        usersRecommendationId: 123,
        institutions: 'Institut Teknologi Bandung',
        purposes: 'Beasiswa penelitian',
        deadline: '2024-11-30',
        detail: 'Rekomendasi untuk program beasiswa',
        tanggal_pengajuan: new Date('2024-02-20'),
        status: 'Approved',
      },
    ]);
  });

  it('should return empty array when user has no recommendations', async () => {
    // Arrange
    mockHolRecommendationsRepository.readByUserId.mockResolvedValue([]);

    getRecommendation.mockImplementation((payload) => ({
      recommendationId: payload.id,
      usersRecommendationId: payload.id_hol_users_recommendations,
      institutions: payload.institutions,
      purposes: payload.pusposes,
      deadline: payload.deadline,
      detail: payload.details,
      tanggal_pengajuan: payload.created_at,
      status: payload.status,
    }));

    const params = { id: 456 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(mockHolRecommendationsRepository.readByUserId).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 456,
    });

    expect(result).toEqual([]);
  });

  it('should return empty array when repository returns null', async () => {
    // Arrange
    mockHolRecommendationsRepository.readByUserId.mockResolvedValue(null);

    getRecommendation.mockImplementation((payload) => ({
      recommendationId: payload.id,
      usersRecommendationId: payload.id_hol_users_recommendations,
      institutions: payload.institutions,
      purposes: payload.pusposes,
      deadline: payload.deadline,
      detail: payload.details,
      tanggal_pengajuan: payload.created_at,
      status: payload.status,
    }));

    const params = { id: 789 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(mockHolRecommendationsRepository.readByUserId).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 789,
    });

    expect(result).toEqual([]);
  });

  it('should handle single recommendation correctly', async () => {
    // Arrange
    const mockRecommendations = [
      {
        id: 5,
        id_hol_users_recommendations: 101,
        institutions: 'Universitas Gadjah Mada',
        pusposes: 'Program pertukaran mahasiswa',
        deadline: '2024-10-15',
        details: 'Rekomendasi untuk program exchange',
        created_at: new Date('2024-03-10'),
        status: 'Rejected',
      },
    ];

    mockHolRecommendationsRepository.readByUserId.mockResolvedValue(mockRecommendations);

    getRecommendation.mockImplementation((payload) => ({
      recommendationId: payload.id,
      usersRecommendationId: payload.id_hol_users_recommendations,
      institutions: payload.institutions,
      purposes: payload.pusposes,
      deadline: payload.deadline,
      detail: payload.details,
      tanggal_pengajuan: payload.created_at,
      status: payload.status,
    }));

    const params = { id: 101 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(mockHolRecommendationsRepository.readByUserId).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 101,
    });

    expect(result).toEqual([
      {
        recommendationId: 5,
        usersRecommendationId: 101,
        institutions: 'Universitas Gadjah Mada',
        purposes: 'Program pertukaran mahasiswa',
        deadline: '2024-10-15',
        detail: 'Rekomendasi untuk program exchange',
        tanggal_pengajuan: new Date('2024-03-10'),
        status: 'Rejected',
      },
    ]);
  });

  it('should handle repository errors properly', async () => {
    // Arrange
    const repositoryError = new Error('Database connection failed');
    mockHolRecommendationsRepository.readByUserId.mockRejectedValue(repositoryError);

    const params = { id: 999 };

    // Act & Assert
    await expect(useCase.execute(params)).rejects.toThrow('Database connection failed');

    expect(mockHolRecommendationsRepository.readByUserId).toHaveBeenCalledWith({
      HOLUsersRecommendationId: 999,
    });
  });

  it('should transform data correctly with all entity fields', async () => {
    // Arrange
    const mockRecommendations = [
      {
        id: 10,
        id_hol_users_recommendations: 555,
        institutions: 'Universitas Airlangga',
        pusposes: 'Program PhD',
        deadline: '2025-01-15',
        details: 'Rekomendasi untuk program doktoral dengan penelitian di bidang bioteknologi',
        created_at: new Date('2024-04-05'),
        status: 'Approved',
      },
    ];

    mockHolRecommendationsRepository.readByUserId.mockResolvedValue(mockRecommendations);

    getRecommendation.mockImplementation((payload) => ({
      recommendationId: payload.id,
      usersRecommendationId: payload.id_hol_users_recommendations,
      institutions: payload.institutions,
      purposes: payload.pusposes,
      deadline: payload.deadline,
      detail: payload.details,
      tanggal_pengajuan: payload.created_at,
      status: payload.status,
    }));

    const params = { id: 555 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(getRecommendation).toHaveBeenCalledWith({
      id: 10,
      id_hol_users_recommendations: 555,
      institutions: 'Universitas Airlangga',
      pusposes: 'Program PhD',
      deadline: '2025-01-15',
      details: 'Rekomendasi untuk program doktoral dengan penelitian di bidang bioteknologi',
      created_at: new Date('2024-04-05'),
      status: 'Approved',
    });

    expect(result[0]).toEqual({
      recommendationId: 10,
      usersRecommendationId: 555,
      institutions: 'Universitas Airlangga',
      purposes: 'Program PhD',
      deadline: '2025-01-15',
      detail: 'Rekomendasi untuk program doktoral dengan penelitian di bidang bioteknologi',
      tanggal_pengajuan: new Date('2024-04-05'),
      status: 'Approved',
    });
  });

  it('should handle multiple recommendations with different statuses', async () => {
    // Arrange
    const mockRecommendations = [
      {
        id: 11,
        id_hol_users_recommendations: 777,
        institutions: 'Universitas Padjadjaran',
        pusposes: 'Program magang',
        deadline: '2024-09-30',
        details: 'Rekomendasi untuk program internship',
        created_at: new Date('2024-05-12'),
        status: 'Pending',
      },
      {
        id: 12,
        id_hol_users_recommendations: 777,
        institutions: 'Universitas Diponegoro',
        pusposes: 'Program penelitian',
        deadline: '2024-12-01',
        details: 'Rekomendasi untuk program riset',
        created_at: new Date('2024-06-20'),
        status: 'Approved',
      },
      {
        id: 13,
        id_hol_users_recommendations: 777,
        institutions: 'Institut Teknologi Sepuluh Nopember',
        pusposes: 'Program beasiswa',
        deadline: '2024-08-15',
        details: 'Rekomendasi untuk beasiswa S2',
        created_at: new Date('2024-07-01'),
        status: 'Rejected',
      },
    ];

    mockHolRecommendationsRepository.readByUserId.mockResolvedValue(mockRecommendations);

    getRecommendation.mockImplementation((payload) => ({
      recommendationId: payload.id,
      usersRecommendationId: payload.id_hol_users_recommendations,
      institutions: payload.institutions,
      purposes: payload.pusposes,
      deadline: payload.deadline,
      detail: payload.details,
      tanggal_pengajuan: payload.created_at,
      status: payload.status,
    }));

    const params = { id: 777 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        recommendationId: 11,
        usersRecommendationId: 777,
        institutions: 'Universitas Padjadjaran',
        purposes: 'Program magang',
        deadline: '2024-09-30',
        detail: 'Rekomendasi untuk program internship',
        tanggal_pengajuan: new Date('2024-05-12'),
        status: 'Pending',
      },
      {
        recommendationId: 12,
        usersRecommendationId: 777,
        institutions: 'Universitas Diponegoro',
        purposes: 'Program penelitian',
        deadline: '2024-12-01',
        detail: 'Rekomendasi untuk program riset',
        tanggal_pengajuan: new Date('2024-06-20'),
        status: 'Approved',
      },
      {
        recommendationId: 13,
        usersRecommendationId: 777,
        institutions: 'Institut Teknologi Sepuluh Nopember',
        purposes: 'Program beasiswa',
        deadline: '2024-08-15',
        detail: 'Rekomendasi untuk beasiswa S2',
        tanggal_pengajuan: new Date('2024-07-01'),
        status: 'Rejected',
      },
    ]);
  });
});
