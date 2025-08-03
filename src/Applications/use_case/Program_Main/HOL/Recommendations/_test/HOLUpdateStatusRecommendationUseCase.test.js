/* eslint-disable no-undef */
const HOLUpdateStatusRecommendationUseCase = require('../HOLUpdateStatusRecommendationUseCase');
const updateRecommendations = require('../../../../../../Domains/program_main/hol/recommendations/entities/UpdateRecommendations');

jest.mock('../../../../../../Domains/program_main/hol/recommendations/entities/UpdateRecommendations');

describe('HOLUpdateStatusRecommendationUseCase', () => {
  let mockUsersBCFRepository;
  let mockHolRecommendationsStatusRepository;
  let useCase;

  beforeEach(() => {
    mockUsersBCFRepository = {
      readById: jest.fn(),
    };

    mockHolRecommendationsStatusRepository = {
      update: jest.fn(),
    };

    useCase = new HOLUpdateStatusRecommendationUseCase({
      usersBCFRepository: mockUsersBCFRepository,
      holRecommendationsStatusRepository: mockHolRecommendationsStatusRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update recommendation status correctly', async () => {
    // Arrange
    const mockAdmin = {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
    };

    const mockUpdateResult = {
      id: 123,
      recommendationHolId: 456,
      adminId: 1,
      isChecked: 1,
      updatedAt: new Date('2024-07-28'),
    };

    mockUsersBCFRepository.readById.mockResolvedValue(mockAdmin);
    mockHolRecommendationsStatusRepository.update.mockResolvedValue(mockUpdateResult);

    // Mock entity constructor
    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: 456 };
    const admin = { id: 1 };
    const payload = {
      recommendationStatusId: 2, // Approved
      note: 'Recommendation approved by admin',
    };

    // Act
    const result = await useCase.execute(params, admin, payload);

    // Assert
    expect(updateRecommendations).toHaveBeenCalledWith({
      recommendationStatusId: 2,
      note: 'Recommendation approved by admin',
    });

    expect(mockUsersBCFRepository.readById).toHaveBeenCalledWith({
      id: 1,
    });

    expect(mockHolRecommendationsStatusRepository.update).toHaveBeenCalledWith({
      recommendationHolId: 456,
      adminId: 1,
      isChecked: 1,
      payload: {
        id_recommendations_status: 2,
        note: 'Recommendation approved by admin',
      },
    });

    expect(result).toEqual(mockUpdateResult);
  });

  it('should handle rejection status with note', async () => {
    // Arrange
    const mockAdmin = {
      id: 2,
      name: 'Super Admin',
      email: 'superadmin@example.com',
    };

    const mockUpdateResult = {
      id: 124,
      recommendationHolId: 789,
      adminId: 2,
      isChecked: 1,
      updatedAt: new Date('2024-07-28'),
    };

    mockUsersBCFRepository.readById.mockResolvedValue(mockAdmin);
    mockHolRecommendationsStatusRepository.update.mockResolvedValue(mockUpdateResult);

    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: 789 };
    const admin = { id: 2 };
    const payload = {
      recommendationStatusId: 3, // Rejected
      note: 'Recommendation rejected due to insufficient documentation',
    };

    // Act
    const result = await useCase.execute(params, admin, payload);

    // Assert
    expect(updateRecommendations).toHaveBeenCalledWith({
      recommendationStatusId: 3,
      note: 'Recommendation rejected due to insufficient documentation',
    });

    expect(mockUsersBCFRepository.readById).toHaveBeenCalledWith({
      id: 2,
    });

    expect(mockHolRecommendationsStatusRepository.update).toHaveBeenCalledWith({
      recommendationHolId: 789,
      adminId: 2,
      isChecked: 1,
      payload: {
        id_recommendations_status: 3,
        note: 'Recommendation rejected due to insufficient documentation',
      },
    });

    expect(result).toEqual(mockUpdateResult);
  });

  it('should handle update without note', async () => {
    // Arrange
    const mockAdmin = {
      id: 3,
      name: 'Reviewer Admin',
      email: 'reviewer@example.com',
    };

    const mockUpdateResult = {
      id: 125,
      recommendationHolId: 321,
      adminId: 3,
      isChecked: 1,
      updatedAt: new Date('2024-07-28'),
    };

    mockUsersBCFRepository.readById.mockResolvedValue(mockAdmin);
    mockHolRecommendationsStatusRepository.update.mockResolvedValue(mockUpdateResult);

    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: 321 };
    const admin = { id: 3 };
    const payload = {
      recommendationStatusId: 1, // Pending
      note: null,
    };

    // Act
    const result = await useCase.execute(params, admin, payload);

    // Assert
    expect(updateRecommendations).toHaveBeenCalledWith({
      recommendationStatusId: 1,
      note: null,
    });

    expect(mockUsersBCFRepository.readById).toHaveBeenCalledWith({
      id: 3,
    });

    expect(mockHolRecommendationsStatusRepository.update).toHaveBeenCalledWith({
      recommendationHolId: 321,
      adminId: 3,
      isChecked: 1,
      payload: {
        id_recommendations_status: 1,
        note: null,
      },
    });

    expect(result).toEqual(mockUpdateResult);
  });

  it('should throw error when admin not found', async () => {
    // Arrange
    const adminNotFoundError = new Error('Admin not found');
    mockUsersBCFRepository.readById.mockRejectedValue(adminNotFoundError);

    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: 999 };
    const admin = { id: 999 };
    const payload = {
      recommendationStatusId: 2,
      note: 'Some note',
    };

    // Act & Assert
    await expect(useCase.execute(params, admin, payload)).rejects.toThrow('Admin not found');

    expect(updateRecommendations).toHaveBeenCalledWith({
      recommendationStatusId: 2,
      note: 'Some note',
    });

    expect(mockUsersBCFRepository.readById).toHaveBeenCalledWith({
      id: 999,
    });

    expect(mockHolRecommendationsStatusRepository.update).not.toHaveBeenCalled();
  });

  it('should throw error when update operation fails', async () => {
    // Arrange
    const mockAdmin = {
      id: 4,
      name: 'Test Admin',
      email: 'testadmin@example.com',
    };

    const updateError = new Error('Database update failed');
    mockUsersBCFRepository.readById.mockResolvedValue(mockAdmin);
    mockHolRecommendationsStatusRepository.update.mockRejectedValue(updateError);

    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: 555 };
    const admin = { id: 4 };
    const payload = {
      recommendationStatusId: 2,
      note: 'Update note',
    };

    // Act & Assert
    await expect(useCase.execute(params, admin, payload)).rejects.toThrow('Database update failed');

    expect(updateRecommendations).toHaveBeenCalledWith({
      recommendationStatusId: 2,
      note: 'Update note',
    });

    expect(mockUsersBCFRepository.readById).toHaveBeenCalledWith({
      id: 4,
    });

    expect(mockHolRecommendationsStatusRepository.update).toHaveBeenCalledWith({
      recommendationHolId: 555,
      adminId: 4,
      isChecked: 1,
      payload: {
        id_recommendations_status: 2,
        note: 'Update note',
      },
    });
  });

  it('should handle string recommendationHolId and adminId', async () => {
    // Arrange
    const mockAdmin = {
      id: '5',
      name: 'String Admin',
      email: 'stringadmin@example.com',
    };

    const mockUpdateResult = {
      id: 126,
      recommendationHolId: '777',
      adminId: '5',
      isChecked: 1,
      updatedAt: new Date('2024-07-28'),
    };

    mockUsersBCFRepository.readById.mockResolvedValue(mockAdmin);
    mockHolRecommendationsStatusRepository.update.mockResolvedValue(mockUpdateResult);

    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: '777' };
    const admin = { id: '5' };
    const payload = {
      recommendationStatusId: '2',
      note: 'String IDs test',
    };

    // Act
    const result = await useCase.execute(params, admin, payload);

    // Assert
    expect(mockUsersBCFRepository.readById).toHaveBeenCalledWith({
      id: '5',
    });

    expect(mockHolRecommendationsStatusRepository.update).toHaveBeenCalledWith({
      recommendationHolId: '777',
      adminId: '5',
      isChecked: 1,
      payload: {
        id_recommendations_status: '2',
        note: 'String IDs test',
      },
    });

    expect(result).toEqual(mockUpdateResult);
  });

  it('should always set isChecked to 1', async () => {
    // Arrange
    const mockAdmin = {
      id: 6,
      name: 'Checker Admin',
      email: 'checker@example.com',
    };

    const mockUpdateResult = {
      id: 127,
      recommendationHolId: 888,
      adminId: 6,
      isChecked: 1,
      updatedAt: new Date('2024-07-28'),
    };

    mockUsersBCFRepository.readById.mockResolvedValue(mockAdmin);
    mockHolRecommendationsStatusRepository.update.mockResolvedValue(mockUpdateResult);

    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: 888 };
    const admin = { id: 6 };
    const payload = {
      recommendationStatusId: 4,
      note: 'Testing isChecked always 1',
    };

    // Act
    const result = await useCase.execute(params, admin, payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.update).toHaveBeenCalledWith({
      recommendationHolId: 888,
      adminId: 6,
      isChecked: 1, // Always 1, hardcoded
      payload: {
        id_recommendations_status: 4,
        note: 'Testing isChecked always 1',
      },
    });

    expect(result).toEqual(mockUpdateResult);
  });

  it('should handle empty payload gracefully', async () => {
    // Arrange
    const mockAdmin = {
      id: 7,
      name: 'Empty Payload Admin',
      email: 'empty@example.com',
    };

    const mockUpdateResult = {
      id: 128,
      recommendationHolId: 111,
      adminId: 7,
      isChecked: 1,
      updatedAt: new Date('2024-07-28'),
    };

    mockUsersBCFRepository.readById.mockResolvedValue(mockAdmin);
    mockHolRecommendationsStatusRepository.update.mockResolvedValue(mockUpdateResult);

    updateRecommendations.mockImplementation((payload) => ({
      id_recommendations_status: payload.recommendationStatusId,
      note: payload.note,
    }));

    const params = { recommendationHolId: 111 };
    const admin = { id: 7 };
    const payload = {}; // Empty payload

    // Act
    const result = await useCase.execute(params, admin, payload);

    // Assert
    expect(updateRecommendations).toHaveBeenCalledWith({});

    expect(mockHolRecommendationsStatusRepository.update).toHaveBeenCalledWith({
      recommendationHolId: 111,
      adminId: 7,
      isChecked: 1,
      payload: {
        id_recommendations_status: undefined,
        note: undefined,
      },
    });

    expect(result).toEqual(mockUpdateResult);
  });
});
