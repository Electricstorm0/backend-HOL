/* eslint-disable no-undef */
const GetBAUseCase = require('../HOLGetBAUseCase');
const GetBA = require('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/GetBA');

jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/GetBA');

describe('GetBAUseCase', () => {
  it('should orchestrate the get BA events correctly with pagination', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(10), // total 10 events
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue([
        {
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
        },
        {
          id_events_hol: 2,
          id_hol_events_type: 1,
          name: 'Data Visualization Seminar',
          deadline: new Date('2024-11-15'),
          duration: '1 day',
          id_regencies: 102,
          description: 'Learn advanced data visualization',
          benefit: 'Master visualization tools',
          contact_person: 'Jane Smith',
          picture_url: 'https://example.com/seminar.jpg',
          category: 'Seminar',
        },
      ]),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    // Mock class constructor to just return the input payload
    GetBA.mockImplementation((payload) => payload);

    const payload = {
      pageSize: '5',
      page: 2,
      holEventsTypeId: 1,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.readCountByProgramType).toBeCalledWith({ holEventsTypeId: 1 });
    expect(mockHolEventsBARepository.read).toBeCalledWith({
      skip: 5, // (page - 1) * pageSize = (2 - 1) * 5 = 5
      numPerPage: 5,
      holEventsTypeId: 1,
    });

    expect(result).toEqual({
      result: [
        {
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
        },
        {
          id_events_hol: 2,
          id_hol_events_type: 1,
          name: 'Data Visualization Seminar',
          deadline: new Date('2024-11-15'),
          duration: '1 day',
          id_regencies: 102,
          description: 'Learn advanced data visualization',
          benefit: 'Master visualization tools',
          contact_person: 'Jane Smith',
          picture_url: 'https://example.com/seminar.jpg',
          category: 'Seminar',
        },
      ],
      current: 1, // offset = page - 1 = 1
      perPage: 5,
      previous: 1, // page - 1 = 1
      next: undefined, // no next page since we're on last page
    });
  });

  it('should return empty result if repository returns empty array', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(0),
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue([]),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ pageSize: '5', page: 1, holEventsTypeId: 1 });

    // Assert
    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 5,
      previous: undefined,
      next: undefined,
    });
  });

  it('should handle null repository result', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(5),
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue(null),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ pageSize: '10', page: 1, holEventsTypeId: 2 });

    // Assert
    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 10,
      previous: undefined,
      next: undefined,
    });
  });

  it('should handle default pagination when pageSize is not provided', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(3),
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue([
        {
          id_events_hol: 1,
          id_hol_events_type: 2,
          name: 'Default Event',
          deadline: new Date('2024-12-01'),
          duration: '2 hours',
          id_regencies: 104,
          description: 'Default event description',
          benefit: 'Default benefit',
          contact_person: 'Default Person',
          picture_url: 'https://example.com/default.jpg',
          category: 'Default',
        },
      ]),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ page: 1, holEventsTypeId: 2 });

    // Assert
    expect(mockHolEventsBARepository.read).toBeCalledWith({
      skip: 0,
      numPerPage: 1, // default pageSize
      holEventsTypeId: 2,
    });

    expect(result.current).toBe(0);
    expect(result.perPage).toBe(1);
  });

  it('should handle first page pagination correctly', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(15),
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue([
        {
          id_events_hol: 1,
          id_hol_events_type: 1,
          name: 'First Page Event',
          deadline: new Date('2024-12-01'),
          duration: '1 day',
          id_regencies: 105,
          description: 'Event on first page',
          benefit: 'Testing first page',
          contact_person: 'First Page Tester',
          picture_url: 'https://example.com/first.jpg',
          category: 'Test',
        },
      ]),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ pageSize: '5', page: 1, holEventsTypeId: 1 });

    // Assert
    expect(mockHolEventsBARepository.read).toBeCalledWith({
      skip: 0, // (1 - 1) * 5 = 0
      numPerPage: 5,
      holEventsTypeId: 1,
    });

    expect(result.current).toBe(0);
    expect(result.previous).toBeUndefined(); // No previous page
    expect(result.next).toBe(1); // Has next page
  });

  it('should handle last page pagination correctly', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(10),
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue([
        {
          id_events_hol: 10,
          id_hol_events_type: 1,
          name: 'Last Page Event',
          deadline: new Date('2024-12-01'),
          duration: '1 day',
          id_regencies: 106,
          description: 'Event on last page',
          benefit: 'Testing last page',
          contact_person: 'Last Page Tester',
          picture_url: 'https://example.com/last.jpg',
          category: 'Test',
        },
      ]),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ pageSize: '5', page: 2, holEventsTypeId: 1 }); // Last page (10 records, 5 per page = 2 pages)

    // Assert
    expect(result.current).toBe(1);
    expect(result.previous).toBe(1);
    expect(result.next).toBeUndefined(); // No next page
  });

  it('should handle string values for page parameter', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(20),
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue([
        {
          id_events_hol: 1,
          id_hol_events_type: 1,
          name: 'String Page Event',
          deadline: new Date('2024-12-01'),
          duration: '1 day',
          id_regencies: 107,
          description: 'Event with string page',
          benefit: 'Testing string parsing',
          contact_person: 'String Tester',
          picture_url: 'https://example.com/string.jpg',
          category: 'Test',
        },
      ]),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({ pageSize: '3', page: '3', holEventsTypeId: 1 });

    // Assert
    expect(mockHolEventsBARepository.read).toBeCalledWith({
      skip: 6, // (3 - 1) * 3 = 6
      numPerPage: 3,
      holEventsTypeId: 1,
    });

    expect(result.current).toBe(2); // page - 1 = 2
    expect(result.perPage).toBe(3);
  });

  it('should handle invalid pagination values gracefully', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(5),
    };

    const mockHolEventsBARepository = {
      read: jest.fn().mockResolvedValue([]),
    };

    const useCase = new GetBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    GetBA.mockImplementation((payload) => payload);

    // Act
    const result = await useCase.execute({
      pageSize: 'invalid',
      page: 'invalid',
      holEventsTypeId: 1,
    });

    // Assert
    expect(mockHolEventsBARepository.read).toBeCalledWith({
      skip: 0, // NaN becomes 0
      numPerPage: 1, // Invalid becomes default 1
      holEventsTypeId: 1,
    });

    expect(result.current).toBe(0);
    expect(result.perPage).toBe(1);
  });
});
