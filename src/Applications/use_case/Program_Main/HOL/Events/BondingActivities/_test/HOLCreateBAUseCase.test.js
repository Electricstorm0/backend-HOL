/* eslint-disable no-undef */
const CreateBAUseCase = require('../HOLCreateBAUseCase');

describe('CreateBAUseCase', () => {
  let mockHolEventsRepository;
  let mockHolEventsBARepository;
  let useCase;

  beforeEach(() => {
    mockHolEventsRepository = {
      create: jest.fn(),
    };

    mockHolEventsBARepository = {
      create: jest.fn(),
    };

    useCase = new CreateBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create BA event successfully', async () => {
    // Arrange
    const eventId = 'event-123';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 1,
      name: 'Business Analytics Workshop',
      deadline: '2024-12-31',
      duration: '3 days',
      regenciesId: 101,
      description: 'Comprehensive workshop on business analytics fundamentals',
      benefit: 'Learn data-driven decision making techniques',
      contact_person: 'John Doe (john@example.com)',
      pictureUrl: 'https://example.com/workshop-banner.jpg',
      category: 'Workshop',
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 1,
      name: 'Business Analytics Workshop',
      deadline: '2024-12-31',
      duration: '3 days',
      regenciesId: 101,
      description: 'Comprehensive workshop on business analytics fundamentals',
      benefit: 'Learn data-driven decision making techniques',
      contact_person: 'John Doe (john@example.com)',
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: eventId,
      pictureUrl: 'https://example.com/workshop-banner.jpg',
      category: 'Workshop',
    });
  });

  it('should create BA seminar event successfully', async () => {
    // Arrange
    const eventId = 'event-456';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 2,
      name: 'Data Visualization Seminar',
      deadline: '2024-11-15',
      duration: '1 day',
      regenciesId: 102,
      description: 'Learn advanced data visualization techniques using modern tools',
      benefit: 'Master Tableau, Power BI, and D3.js for effective data storytelling',
      contact_person: 'Jane Smith (jane@company.com)',
      pictureUrl: 'https://example.com/seminar-poster.jpg',
      category: 'Seminar',
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 2,
      name: 'Data Visualization Seminar',
      deadline: '2024-11-15',
      duration: '1 day',
      regenciesId: 102,
      description: 'Learn advanced data visualization techniques using modern tools',
      benefit: 'Master Tableau, Power BI, and D3.js for effective data storytelling',
      contact_person: 'Jane Smith (jane@company.com)',
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: eventId,
      pictureUrl: 'https://example.com/seminar-poster.jpg',
      category: 'Seminar',
    });
  });

  it('should handle null/undefined values in payload', async () => {
    // Arrange
    const eventId = 'event-789';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 3,
      name: 'Machine Learning Course',
      deadline: null,
      duration: undefined,
      regenciesId: 103,
      description: 'Introduction to machine learning algorithms',
      benefit: null,
      contact_person: 'AI Department',
      pictureUrl: null,
      category: undefined,
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 3,
      name: 'Machine Learning Course',
      deadline: null,
      duration: undefined,
      regenciesId: 103,
      description: 'Introduction to machine learning algorithms',
      benefit: null,
      contact_person: 'AI Department',
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: eventId,
      pictureUrl: null,
      category: undefined,
    });
  });

  it('should throw error when events repository create fails', async () => {
    // Arrange
    const repositoryError = new Error('Database connection failed');
    mockHolEventsRepository.create.mockRejectedValue(repositoryError);

    const payload = {
      holEventsTypeId: 1,
      name: 'Failed Event',
      deadline: '2024-10-01',
      duration: '2 hours',
      regenciesId: 104,
      description: 'This event will fail to create',
      benefit: 'No benefit',
      contact_person: 'Error Person',
      pictureUrl: 'https://example.com/error.jpg',
      category: 'Error',
    };

    // Act & Assert
    await expect(useCase.execute(payload)).rejects.toThrow('Database connection failed');

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 1,
      name: 'Failed Event',
      deadline: '2024-10-01',
      duration: '2 hours',
      regenciesId: 104,
      description: 'This event will fail to create',
      benefit: 'No benefit',
      contact_person: 'Error Person',
    });

    // BA repository should not be called if events repository fails
    expect(mockHolEventsBARepository.create).not.toHaveBeenCalled();
  });

  it('should throw error when BA repository create fails', async () => {
    // Arrange
    const eventId = 'event-error';
    const baRepositoryError = new Error('BA table constraint violation');

    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockRejectedValue(baRepositoryError);

    const payload = {
      holEventsTypeId: 4,
      name: 'Statistics Bootcamp',
      deadline: '2024-09-20',
      duration: '5 days',
      regenciesId: 105,
      description: 'Intensive statistics training',
      benefit: 'Master statistical analysis',
      contact_person: 'Stats Team',
      pictureUrl: 'https://example.com/stats.jpg',
      category: 'Bootcamp',
    };

    // Act & Assert
    await expect(useCase.execute(payload)).rejects.toThrow('BA table constraint violation');

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 4,
      name: 'Statistics Bootcamp',
      deadline: '2024-09-20',
      duration: '5 days',
      regenciesId: 105,
      description: 'Intensive statistics training',
      benefit: 'Master statistical analysis',
      contact_person: 'Stats Team',
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: eventId,
      pictureUrl: 'https://example.com/stats.jpg',
      category: 'Bootcamp',
    });
  });

  it('should handle empty strings in payload', async () => {
    // Arrange
    const eventId = 'event-empty';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 5,
      name: '',
      deadline: '',
      duration: '',
      regenciesId: 106,
      description: '',
      benefit: '',
      contact_person: '',
      pictureUrl: '',
      category: '',
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 5,
      name: '',
      deadline: '',
      duration: '',
      regenciesId: 106,
      description: '',
      benefit: '',
      contact_person: '',
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: eventId,
      pictureUrl: '',
      category: '',
    });
  });

  it('should handle numeric eventId from repository', async () => {
    // Arrange
    const eventId = 12345; // numeric ID
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 6,
      name: 'Numeric ID Event',
      deadline: '2024-08-30',
      duration: '4 hours',
      regenciesId: 107,
      description: 'Event with numeric ID',
      benefit: 'Testing numeric IDs',
      contact_person: 'Numeric Team',
      pictureUrl: 'https://example.com/numeric.jpg',
      category: 'Training',
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 6,
      name: 'Numeric ID Event',
      deadline: '2024-08-30',
      duration: '4 hours',
      regenciesId: 107,
      description: 'Event with numeric ID',
      benefit: 'Testing numeric IDs',
      contact_person: 'Numeric Team',
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: 12345,
      pictureUrl: 'https://example.com/numeric.jpg',
      category: 'Training',
    });
  });

  it('should handle partial payload with missing fields', async () => {
    // Arrange
    const eventId = 'event-partial';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 7,
      name: 'Partial Event',
      regenciesId: 108,
      // missing: deadline, duration, description, benefit, contact_person, pictureUrl, category
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 7,
      name: 'Partial Event',
      deadline: undefined,
      duration: undefined,
      regenciesId: 108,
      description: undefined,
      benefit: undefined,
      contact_person: undefined,
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: eventId,
      pictureUrl: undefined,
      category: undefined,
    });
  });

  it('should create event with complete valid data', async () => {
    // Arrange
    const eventId = 'event-complete';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 8,
      name: 'Complete Data Science Conference',
      deadline: '2024-12-01T23:59:59Z',
      duration: '3 days (24 hours total)',
      regenciesId: 109,
      description: 'A comprehensive conference covering all aspects of data science including machine learning, deep learning, natural language processing, and computer vision.',
      benefit: 'Participants will gain hands-on experience with cutting-edge tools, network with industry experts, and receive certification upon completion.',
      contact_person: 'Dr. Sarah Johnson (sarah.johnson@university.edu) - Conference Director',
      pictureUrl: 'https://cdn.example.com/events/data-science-conference-2024-banner.jpg',
      category: 'Conference',
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 8,
      name: 'Complete Data Science Conference',
      deadline: '2024-12-01T23:59:59Z',
      duration: '3 days (24 hours total)',
      regenciesId: 109,
      description: 'A comprehensive conference covering all aspects of data science including machine learning, deep learning, natural language processing, and computer vision.',
      benefit: 'Participants will gain hands-on experience with cutting-edge tools, network with industry experts, and receive certification upon completion.',
      contact_person: 'Dr. Sarah Johnson (sarah.johnson@university.edu) - Conference Director',
    });

    expect(mockHolEventsBARepository.create).toHaveBeenCalledWith({
      holEventsId: eventId,
      pictureUrl: 'https://cdn.example.com/events/data-science-conference-2024-banner.jpg',
      category: 'Conference',
    });
  });
});
