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
    const eventId = 'event-123';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 1,
      pictureUrl: 'https://example.com/workshop-banner.jpg',
      name: 'Business Analytics Workshop',
      deadline: '2024-12-31',
      duration: '3 days',
      regenciesId: 101,
      description: 'Comprehensive workshop on business analytics fundamentals',
      benefit: 'Learn data-driven decision making techniques',
      contact_person: 'John Doe (john@example.com)',
      category: 'Workshop',
    };

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 1,
      pictureUrl: 'https://example.com/workshop-banner.jpg',
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
      category: 'Workshop',
    });
  });

  it('should create BA seminar event successfully', async () => {
    const eventId = 'event-456';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 2,
      pictureUrl: 'https://example.com/seminar-poster.jpg',
      name: 'Data Visualization Seminar',
      deadline: '2024-11-15',
      duration: '1 day',
      regenciesId: 102,
      description: 'Learn advanced data visualization techniques using modern tools',
      benefit: 'Master Tableau, Power BI, and D3.js for effective data storytelling',
      contact_person: 'Jane Smith (jane@company.com)',
      category: 'Seminar',
    };

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 2,
      pictureUrl: 'https://example.com/seminar-poster.jpg',
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
      category: 'Seminar',
    });
  });

  it('should handle null/undefined values in payload', async () => {
    const eventId = 'event-789';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 3,
      pictureUrl: null,
      name: 'Machine Learning Course',
      deadline: null,
      duration: undefined,
      regenciesId: 103,
      description: 'Introduction to machine learning algorithms',
      benefit: null,
      contact_person: 'AI Department',
      category: undefined,
    };

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 3,
      pictureUrl: null,
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
      category: undefined,
    });
  });

  it('should throw error when events repository create fails', async () => {
    const repositoryError = new Error('Database connection failed');
    mockHolEventsRepository.create.mockRejectedValue(repositoryError);

    const payload = {
      holEventsTypeId: 1,
      pictureUrl: 'https://example.com/error.jpg',
      name: 'Failed Event',
      deadline: '2024-10-01',
      duration: '2 hours',
      regenciesId: 104,
      description: 'This event will fail to create',
      benefit: 'No benefit',
      contact_person: 'Error Person',
      category: 'Error',
    };

    await expect(useCase.execute(payload)).rejects.toThrow('Database connection failed');

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 1,
      pictureUrl: 'https://example.com/error.jpg',
      name: 'Failed Event',
      deadline: '2024-10-01',
      duration: '2 hours',
      regenciesId: 104,
      description: 'This event will fail to create',
      benefit: 'No benefit',
      contact_person: 'Error Person',
    });

    expect(mockHolEventsBARepository.create).not.toHaveBeenCalled();
  });

  it('should throw error when BA repository create fails', async () => {
    const eventId = 'event-error';
    const baRepositoryError = new Error('BA table constraint violation');

    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockRejectedValue(baRepositoryError);

    const payload = {
      holEventsTypeId: 4,
      pictureUrl: 'https://example.com/stats.jpg',
      name: 'Statistics Bootcamp',
      deadline: '2024-09-20',
      duration: '5 days',
      regenciesId: 105,
      description: 'Intensive statistics training',
      benefit: 'Master statistical analysis',
      contact_person: 'Stats Team',
      category: 'Bootcamp',
    };

    await expect(useCase.execute(payload)).rejects.toThrow('BA table constraint violation');

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 4,
      pictureUrl: 'https://example.com/stats.jpg',
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
      category: 'Bootcamp',
    });
  });

  it('should handle empty strings in payload', async () => {
    const eventId = 'event-empty';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 5,
      pictureUrl: '',
      name: '',
      deadline: '',
      duration: '',
      regenciesId: 106,
      description: '',
      benefit: '',
      contact_person: '',
      category: '',
    };

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 5,
      pictureUrl: '',
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
      category: '',
    });
  });

  it('should handle numeric eventId from repository', async () => {
    const eventId = 12345;
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 6,
      pictureUrl: 'https://example.com/numeric.jpg',
      name: 'Numeric ID Event',
      deadline: '2024-08-30',
      duration: '4 hours',
      regenciesId: 107,
      description: 'Event with numeric ID',
      benefit: 'Testing numeric IDs',
      contact_person: 'Numeric Team',
      category: 'Training',
    };

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 6,
      pictureUrl: 'https://example.com/numeric.jpg',
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
      category: 'Training',
    });
  });

  it('should handle partial payload with missing fields', async () => {
    const eventId = 'event-partial';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 7,
      name: 'Partial Event',
      regenciesId: 108,
    };

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 7,
      pictureUrl: undefined,
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
      category: undefined,
    });
  });

  it('should create event with complete valid data', async () => {
    const eventId = 'event-complete';
    mockHolEventsRepository.create.mockResolvedValue(eventId);
    mockHolEventsBARepository.create.mockResolvedValue();

    const payload = {
      holEventsTypeId: 8,
      pictureUrl: 'https://cdn.example.com/events/data-science-conference-2024-banner.jpg',
      name: 'Complete Data Science Conference',
      deadline: '2024-12-01T23:59:59Z',
      duration: '3 days (24 hours total)',
      regenciesId: 109,
      description: 'A comprehensive conference covering all aspects of data science including machine learning, deep learning, natural language processing, and computer vision.',
      benefit: 'Participants will gain hands-on experience with cutting-edge tools, network with industry experts, and receive certification upon completion.',
      contact_person: 'Dr. Sarah Johnson (sarah.johnson@university.edu) - Conference Director',
      category: 'Conference',
    };

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toHaveBeenCalledWith({
      holEventsTypeId: 8,
      pictureUrl: 'https://cdn.example.com/events/data-science-conference-2024-banner.jpg',
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
      category: 'Conference',
    });
  });
});
