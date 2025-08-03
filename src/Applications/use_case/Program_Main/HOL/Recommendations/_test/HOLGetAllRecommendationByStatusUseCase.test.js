/* eslint-disable no-undef */
const HOLGetAllRecommendationByStatusUseCase = require('../HOLGetAllRecommendationByStatusUseCase');
const getUsersRecommendation = require('../../../../../../Domains/program_main/hol/recommendations/entities/GetUsersRecommendation');

jest.mock('../../../../../../Domains/program_main/hol/recommendations/entities/GetUsersRecommendation');

describe('HOLGetAllRecommendationByStatusUseCase', () => {
  let mockHolRecommendationsStatusRepository;
  let mockHolRecommendationsRepository;
  let useCase;

  beforeEach(() => {
    mockHolRecommendationsStatusRepository = {
      readCountRecommendationByStatus: jest.fn(),
    };

    mockHolRecommendationsRepository = {
      readByStatusId: jest.fn(),
    };

    useCase = new HOLGetAllRecommendationByStatusUseCase({
      holRecommendationsStatusRepository: mockHolRecommendationsStatusRepository,
      holRecommendationsRepository: mockHolRecommendationsRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate get all recommendations by status correctly with pagination', async () => {
    // Arrange
    const mockRecommendations = [
      {
        Alumni_Name: 'John Doe',
        Program: 'Computer Science',
        Batch: '2020',
        Year: 2024,
        deadline: '2024-12-31',
        status: 'Pending',
      },
      {
        Alumni_Name: 'Jane Smith',
        Program: 'Information Systems',
        Batch: '2019',
        Year: 2024,
        deadline: '2024-11-30',
        status: 'Pending',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(15);
    mockHolRecommendationsRepository.readByStatusId.mockResolvedValue(mockRecommendations);

    // Mock class constructor to return transformed payload
    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      pageSize: 5,
      page: 2,
      recommendationStatusId: 1,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 1,
    });
    expect(mockHolRecommendationsRepository.readByStatusId).toHaveBeenCalledWith({
      skip: 5, // (page - 1) * pageSize = (2 - 1) * 5
      numPerPage: 5,
      recommendationStatusId: 1,
    });

    expect(result).toEqual({
      result: [
        {
          alumniName: 'John Doe',
          program: 'Computer Science',
          batch: '2020',
          year: 2024,
          deadline: '2024-12-31',
          status: 'Pending',
        },
        {
          alumniName: 'Jane Smith',
          program: 'Information Systems',
          batch: '2019',
          year: 2024,
          deadline: '2024-11-30',
          status: 'Pending',
        },
      ],
      current: 1, // offset = page - 1 = 1
      perPage: 5,
      previous: 1, // page - 1 = 1
      next: 2, // offset + 1 = 2 (karena 15 data dengan 5 per page = 3 pages, offset 1 < 3-1)
    });
  });

  it('should handle first page correctly', async () => {
    // Arrange
    const mockRecommendations = [
      {
        Alumni_Name: 'Alice Johnson',
        Program: 'Data Science',
        Batch: '2021',
        Year: 2024,
        deadline: '2024-10-15',
        status: 'Approved',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(3);
    mockHolRecommendationsRepository.readByStatusId.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      pageSize: 2,
      page: 1,
      recommendationStatusId: 2,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 2,
    });
    expect(mockHolRecommendationsRepository.readByStatusId).toHaveBeenCalledWith({
      skip: 0, // (page - 1) * pageSize = (1 - 1) * 2
      numPerPage: 2,
      recommendationStatusId: 2,
    });

    expect(result).toEqual({
      result: [
        {
          alumniName: 'Alice Johnson',
          program: 'Data Science',
          batch: '2021',
          year: 2024,
          deadline: '2024-10-15',
          status: 'Approved',
        },
      ],
      current: 0, // offset = page - 1 = 0
      perPage: 2,
      previous: undefined, // offset = 0, tidak ada previous
      next: 1, // offset + 1 = 1 (karena 3 data dengan 2 per page = 2 pages, offset 0 < 2-1)
    });
  });

  it('should handle last page correctly', async () => {
    // Arrange
    const mockRecommendations = [
      {
        Alumni_Name: 'Bob Wilson',
        Program: 'Software Engineering',
        Batch: '2018',
        Year: 2024,
        deadline: '2024-09-30',
        status: 'Rejected',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(5);
    mockHolRecommendationsRepository.readByStatusId.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      pageSize: 2,
      page: 3, // last page
      recommendationStatusId: 3,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 3,
    });
    expect(mockHolRecommendationsRepository.readByStatusId).toHaveBeenCalledWith({
      skip: 4, // (page - 1) * pageSize = (3 - 1) * 2
      numPerPage: 2,
      recommendationStatusId: 3,
    });

    expect(result).toEqual({
      result: [
        {
          alumniName: 'Bob Wilson',
          program: 'Software Engineering',
          batch: '2018',
          year: 2024,
          deadline: '2024-09-30',
          status: 'Rejected',
        },
      ],
      current: 2, // offset = page - 1 = 2
      perPage: 2,
      previous: 2, // page - 1 = 2
      next: undefined, // offset 2 >= numPages - 1 (3 - 1 = 2), tidak ada next
    });
  });

  it('should return empty result when repository returns empty array', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(0);
    mockHolRecommendationsRepository.readByStatusId.mockResolvedValue([]);

    getUsersRecommendation.mockImplementation((payload) => payload);

    const payload = {
      pageSize: 5,
      page: 1,
      recommendationStatusId: 4,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendationByStatus).toHaveBeenCalledWith({
      recommendationStatusId: 4,
    });
    expect(mockHolRecommendationsRepository.readByStatusId).toHaveBeenCalledWith({
      skip: 0,
      numPerPage: 5,
      recommendationStatusId: 4,
    });

    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 5,
      previous: undefined,
      next: undefined,
    });
  });

  it('should handle default values when pageSize and page are not provided', async () => {
    // Arrange
    const mockRecommendations = [
      {
        Alumni_Name: 'Charlie Brown',
        Program: 'Business Administration',
        Batch: '2022',
        Year: 2024,
        deadline: '2024-08-15',
        status: 'Pending',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(1);
    mockHolRecommendationsRepository.readByStatusId.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      recommendationStatusId: 5,
      // pageSize dan page tidak disediakan
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsRepository.readByStatusId).toHaveBeenCalledWith({
      skip: 0, // offset = 0 (default)
      numPerPage: 1, // default pageSize
      recommendationStatusId: 5,
    });

    expect(result.perPage).toBe(1);
    expect(result.current).toBe(0);
  });

  it('should handle repository returning null', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(0);
    mockHolRecommendationsRepository.readByStatusId.mockResolvedValue(null);

    getUsersRecommendation.mockImplementation((payload) => payload);

    const payload = {
      pageSize: 3,
      page: 1,
      recommendationStatusId: 6,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 3,
      previous: undefined,
      next: undefined,
    });
  });

  it('should handle string values for pageSize and page parameters', async () => {
    // Arrange
    const mockRecommendations = [
      {
        Alumni_Name: 'Diana Prince',
        Program: 'Psychology',
        Batch: '2020',
        Year: 2024,
        deadline: '2024-07-20',
        status: 'Approved',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendationByStatus.mockResolvedValue(4);
    mockHolRecommendationsRepository.readByStatusId.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      pageSize: '3', // string
      page: '2', // string
      recommendationStatusId: 7,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsRepository.readByStatusId).toHaveBeenCalledWith({
      skip: 3, // (2 - 1) * 3
      numPerPage: 3,
      recommendationStatusId: 7,
    });

    expect(result.perPage).toBe(3);
    expect(result.current).toBe(1);
  });
});
