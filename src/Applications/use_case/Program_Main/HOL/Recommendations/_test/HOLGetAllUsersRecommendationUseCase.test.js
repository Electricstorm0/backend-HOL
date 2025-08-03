/* eslint-disable no-undef */
const HOLGetAllUsersRecommendationUseCase = require('../HOLGetAllUsersRecommendationUseCase');
const getUsersRecommendation = require('../../../../../../Domains/program_main/hol/recommendations/entities/GetUsersRecommendation');

jest.mock('../../../../../../Domains/program_main/hol/recommendations/entities/GetUsersRecommendation');

describe('HOLGetAllUsersRecommendationUseCase', () => {
  let mockHolRecommendationsStatusRepository;
  let mockHolRecommendationsRepository;
  let useCase;

  beforeEach(() => {
    mockHolRecommendationsStatusRepository = {
      readCountRecommendation: jest.fn(),
    };

    mockHolRecommendationsRepository = {
      read: jest.fn(),
    };

    useCase = new HOLGetAllUsersRecommendationUseCase({
      holRecommendationsStatusRepository: mockHolRecommendationsStatusRepository,
      holRecommendationsRepository: mockHolRecommendationsRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate get all users recommendations correctly with pagination', async () => {
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
        status: 'Approved',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(15);
    mockHolRecommendationsRepository.read.mockResolvedValue(mockRecommendations);

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
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalled();
    expect(mockHolRecommendationsRepository.read).toHaveBeenCalledWith({
      skip: 5, // (page - 1) * pageSize = (2 - 1) * 5
      numPerPage: 5,
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
          status: 'Approved',
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
      {
        Alumni_Name: 'Bob Wilson',
        Program: 'Software Engineering',
        Batch: '2020',
        Year: 2024,
        deadline: '2024-09-30',
        status: 'Pending',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(8);
    mockHolRecommendationsRepository.read.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      pageSize: 3,
      page: 1,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalled();
    expect(mockHolRecommendationsRepository.read).toHaveBeenCalledWith({
      skip: 0, // (page - 1) * pageSize = (1 - 1) * 3
      numPerPage: 3,
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
        {
          alumniName: 'Bob Wilson',
          program: 'Software Engineering',
          batch: '2020',
          year: 2024,
          deadline: '2024-09-30',
          status: 'Pending',
        },
      ],
      current: 0, // offset = page - 1 = 0
      perPage: 3,
      previous: undefined, // offset = 0, tidak ada previous
      next: 1, // offset + 1 = 1 (karena 8 data dengan 3 per page = 3 pages, offset 0 < 3-1)
    });
  });

  it('should handle last page correctly', async () => {
    // Arrange
    const mockRecommendations = [
      {
        Alumni_Name: 'Charlie Brown',
        Program: 'Business Administration',
        Batch: '2018',
        Year: 2024,
        deadline: '2024-08-15',
        status: 'Rejected',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(7);
    mockHolRecommendationsRepository.read.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      pageSize: 3,
      page: 3, // last page
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalled();
    expect(mockHolRecommendationsRepository.read).toHaveBeenCalledWith({
      skip: 6, // (page - 1) * pageSize = (3 - 1) * 3
      numPerPage: 3,
    });

    expect(result).toEqual({
      result: [
        {
          alumniName: 'Charlie Brown',
          program: 'Business Administration',
          batch: '2018',
          year: 2024,
          deadline: '2024-08-15',
          status: 'Rejected',
        },
      ],
      current: 2, // offset = page - 1 = 2
      perPage: 3,
      previous: 2, // page - 1 = 2
      next: undefined, // offset 2 >= numPages - 1 (3 - 1 = 2), tidak ada next
    });
  });

  it('should return empty result when repository returns empty array', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(0);
    mockHolRecommendationsRepository.read.mockResolvedValue([]);

    getUsersRecommendation.mockImplementation((payload) => payload);

    const payload = {
      pageSize: 5,
      page: 1,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsStatusRepository.readCountRecommendation).toHaveBeenCalled();
    expect(mockHolRecommendationsRepository.read).toHaveBeenCalledWith({
      skip: 0,
      numPerPage: 5,
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
        Alumni_Name: 'Diana Prince',
        Program: 'Psychology',
        Batch: '2022',
        Year: 2024,
        deadline: '2024-07-20',
        status: 'Pending',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(1);
    mockHolRecommendationsRepository.read.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      // pageSize dan page tidak disediakan
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsRepository.read).toHaveBeenCalledWith({
      skip: 0, // offset = 0 (default)
      numPerPage: 1, // default pageSize
    });

    expect(result.perPage).toBe(1);
    expect(result.current).toBe(0);
  });

  it('should handle repository returning null', async () => {
    // Arrange
    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(0);
    mockHolRecommendationsRepository.read.mockResolvedValue(null);

    getUsersRecommendation.mockImplementation((payload) => payload);

    const payload = {
      pageSize: 3,
      page: 1,
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
        Alumni_Name: 'Edward Smith',
        Program: 'Engineering',
        Batch: '2019',
        Year: 2024,
        deadline: '2024-06-30',
        status: 'Approved',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(10);
    mockHolRecommendationsRepository.read.mockResolvedValue(mockRecommendations);

    getUsersRecommendation.mockImplementation((payload) => ({
      alumniName: payload.Alumni_Name,
      program: payload.Program,
      batch: payload.Batch,
      year: payload.Year,
      deadline: payload.deadline,
      status: payload.status,
    }));

    const payload = {
      pageSize: '4', // string
      page: '2', // string
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolRecommendationsRepository.read).toHaveBeenCalledWith({
      skip: 4, // (2 - 1) * 4
      numPerPage: 4,
    });

    expect(result.perPage).toBe(4);
    expect(result.current).toBe(1);
  });

  it('should handle single page scenario', async () => {
    // Arrange
    const mockRecommendations = [
      {
        Alumni_Name: 'Frank Miller',
        Program: 'Marketing',
        Batch: '2021',
        Year: 2024,
        deadline: '2024-05-15',
        status: 'Pending',
      },
      {
        Alumni_Name: 'Grace Lee',
        Program: 'Finance',
        Batch: '2020',
        Year: 2024,
        deadline: '2024-04-30',
        status: 'Approved',
      },
    ];

    mockHolRecommendationsStatusRepository.readCountRecommendation.mockResolvedValue(2);
    mockHolRecommendationsRepository.read.mockResolvedValue(mockRecommendations);

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
      page: 1,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(result).toEqual({
      result: [
        {
          alumniName: 'Frank Miller',
          program: 'Marketing',
          batch: '2021',
          year: 2024,
          deadline: '2024-05-15',
          status: 'Pending',
        },
        {
          alumniName: 'Grace Lee',
          program: 'Finance',
          batch: '2020',
          year: 2024,
          deadline: '2024-04-30',
          status: 'Approved',
        },
      ],
      current: 0,
      perPage: 5,
      previous: undefined, // first page
      next: undefined, // only one page (2 data with 5 per page = 1 page)
    });
  });
});
