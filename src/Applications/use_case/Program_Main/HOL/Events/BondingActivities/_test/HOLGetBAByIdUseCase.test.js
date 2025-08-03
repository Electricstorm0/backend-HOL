/* eslint-disable no-undef */
const GetBAByIdUseCase = require('../HOLGetBAByIdUseCase');
const GetBA = require('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/GetBA');

jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/GetBA');

describe('GetBAByIdUseCase', () => {
  it('should orchestrate the get BA event by ID correctly', async () => {
    // Arrange
    const mockHolEventsBARepository = {
      readById: jest.fn().mockResolvedValue({
        id_events_hol: 1,
        id_hol_events_type: 1,
        name: 'Business Analytics Workshop',
        deadline: new Date('2024-12-31'),
        duration: '3 days',
        id_regencies: 101,
        description: 'Comprehensive workshop on business analytics',
        benefit: 'Learn data-driven decision making',
        contact_person: 'John Doe',
        picture_url: 'https://example.com/workshop.jpg',
        category: 'Workshop',
      }),
    };

    const useCase = new GetBAByIdUseCase({
      holEventsBARepository: mockHolEventsBARepository,
    });

    // Mock class constructor to just return the input payload
    GetBA.mockImplementation((payload) => payload);

    const payload = {
      id: 1,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolEventsBARepository.readById).toBeCalledWith({ id: 1 });

    expect(result).toEqual({
      id_events_hol: 1,
      id_hol_events_type: 1,
      name: 'Business Analytics Workshop',
      deadline: new Date('2024-12-31'),
      duration: '3 days',
      id_regencies: 101,
      description: 'Comprehensive workshop on business analytics',
      benefit: 'Learn data-driven decision making',
      contact_person: 'John Doe',
      picture_url: 'https://example.com/workshop.jpg',
      category: 'Workshop',
    });
  });

  it('should return empty GetBA object if repository returns null', async () => {
    // Arrange
    const mockHolEventsBARepository = {
      readById: jest.fn().mockResolvedValue(null),
    };

    const useCase = new GetBAByIdUseCase({
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ id: 999 });

    // Assert
    expect(mockHolEventsBARepository.readById).toBeCalledWith({ id: 999 });
    expect(result).toEqual({});
  });

  it('should return empty GetBA object if repository returns undefined', async () => {
    // Arrange
    const mockHolEventsBARepository = {
      readById: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new GetBAByIdUseCase({
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ id: 888 });

    // Assert
    expect(mockHolEventsBARepository.readById).toBeCalledWith({ id: 888 });
    expect(result).toEqual({});
  });

  it('should handle string ID parameter', async () => {
    // Arrange
    const mockHolEventsBARepository = {
      readById: jest.fn().mockResolvedValue({
        id_events_hol: 2,
        id_hol_events_type: 2,
        name: 'Data Visualization Seminar',
        deadline: new Date('2024-11-15'),
        duration: '1 day',
        id_regencies: 102,
        description: 'Learn advanced data visualization',
        benefit: 'Master visualization tools',
        contact_person: 'Jane Smith',
        picture_url: 'https://example.com/seminar.jpg',
        category: 'Seminar',
      }),
    };

    const useCase = new GetBAByIdUseCase({
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ id: '2' });

    // Assert
    expect(mockHolEventsBARepository.readById).toBeCalledWith({ id: '2' });

    expect(result).toEqual({
      id_events_hol: 2,
      id_hol_events_type: 2,
      name: 'Data Visualization Seminar',
      deadline: new Date('2024-11-15'),
      duration: '1 day',
      id_regencies: 102,
      description: 'Learn advanced data visualization',
      benefit: 'Master visualization tools',
      contact_person: 'Jane Smith',
      picture_url: 'https://example.com/seminar.jpg',
      category: 'Seminar',
    });
  });

  it('should handle repository error', async () => {
    // Arrange
    const repositoryError = new Error('Database connection failed');
    const mockHolEventsBARepository = {
      readById: jest.fn().mockRejectedValue(repositoryError),
    };

    const useCase = new GetBAByIdUseCase({
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act & Assert
    await expect(useCase.execute({ id: 1 })).rejects.toThrow('Database connection failed');

    expect(mockHolEventsBARepository.readById).toBeCalledWith({ id: 1 });
  });

  it('should handle complete BA event data', async () => {
    // Arrange
    const mockHolEventsBARepository = {
      readById: jest.fn().mockResolvedValue({
        id_events_hol: 5,
        id_hol_events_type: 3,
        name: 'Complete Data Science Conference',
        deadline: new Date('2024-12-01T23:59:59Z'),
        duration: '3 days (24 hours total)',
        id_regencies: 109,
        description: 'A comprehensive conference covering all aspects of data science including machine learning, deep learning, natural language processing, and computer vision.',
        benefit: 'Participants will gain hands-on experience with cutting-edge tools, network with industry experts, and receive certification upon completion.',
        contact_person: 'Dr. Sarah Johnson (sarah.johnson@university.edu) - Conference Director',
        picture_url: 'https://cdn.example.com/events/data-science-conference-2024-banner.jpg',
        category: 'Conference',
      }),
    };

    const useCase = new GetBAByIdUseCase({
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ id: 5 });

    // Assert
    expect(mockHolEventsBARepository.readById).toBeCalledWith({ id: 5 });

    expect(result).toEqual({
      id_events_hol: 5,
      id_hol_events_type: 3,
      name: 'Complete Data Science Conference',
      deadline: new Date('2024-12-01T23:59:59Z'),
      duration: '3 days (24 hours total)',
      id_regencies: 109,
      description: 'A comprehensive conference covering all aspects of data science including machine learning, deep learning, natural language processing, and computer vision.',
      benefit: 'Participants will gain hands-on experience with cutting-edge tools, network with industry experts, and receive certification upon completion.',
      contact_person: 'Dr. Sarah Johnson (sarah.johnson@university.edu) - Conference Director',
      picture_url: 'https://cdn.example.com/events/data-science-conference-2024-banner.jpg',
      category: 'Conference',
    });
  });

  it('should handle numeric zero ID', async () => {
    // Arrange
    const mockHolEventsBARepository = {
      readById: jest.fn().mockResolvedValue({
        id_events_hol: 0,
        id_hol_events_type: 1,
        name: 'Zero ID Event',
        deadline: new Date('2024-10-01'),
        duration: '1 hour',
        id_regencies: 100,
        description: 'Event with zero ID',
        benefit: 'Testing zero ID handling',
        contact_person: 'Zero Tester',
        picture_url: 'https://example.com/zero.jpg',
        category: 'Test',
      }),
    };

    const useCase = new GetBAByIdUseCase({
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ id: 0 });

    // Assert
    expect(mockHolEventsBARepository.readById).toBeCalledWith({ id: 0 });

    expect(result).toEqual({
      id_events_hol: 0,
      id_hol_events_type: 1,
      name: 'Zero ID Event',
      deadline: new Date('2024-10-01'),
      duration: '1 hour',
      id_regencies: 100,
      description: 'Event with zero ID',
      benefit: 'Testing zero ID handling',
      contact_person: 'Zero Tester',
      picture_url: 'https://example.com/zero.jpg',
      category: 'Test',
    });
  });
});
