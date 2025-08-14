/* eslint-disable no-undef */
const HOLGetUsersEventsByUsersIdUseCase = require('../HOLGetUsersEventsByUsersIdUseCase');
const GetUsersEventActivity = require('../../../../../../../Domains/program_main/hol/events/entities/GetUsersEventActivity');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/GetUsersEventActivity');

describe('HOLGetUsersEventsByUsersIdUseCase', () => {
  const dummyUserEvent = {
    name: 'Tech Conference',
    deadline: new Date(),
    duration: '3 days',
    domicile: 'Jakarta',
    picture_url: 'https://example.com/pic.jpg',
    category: 'IT',
    position: 'Speaker',
    event_date: new Date(),
    status: 'approve',
  };

  const idParam = { id: 123, status: 'approve' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return array of GetUsersEventActivity entity if data exists', async () => {
    // Arrange
    const mockRepository = {
      readByUsersIdAndStatus: jest.fn().mockResolvedValue([dummyUserEvent]),
    };

    // Mock entity agar tidak menjalankan validasi aslinya
    GetUsersEventActivity.mockImplementation((payload) => payload);

    const useCase = new HOLGetUsersEventsByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    // Act
    const result = await useCase.execute(idParam);

    // Assert
    expect(mockRepository.readByUsersIdAndStatus).toHaveBeenCalledWith({ usersId: idParam.id, status: idParam.status });
    expect(result).toEqual([dummyUserEvent]);
  });

  it('should return empty array if no user event found', async () => {
    const mockRepository = {
      readByUsersIdAndStatus: jest.fn().mockResolvedValue([]),
    };

    GetUsersEventActivity.mockImplementation((payload) => payload);

    const useCase = new HOLGetUsersEventsByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);
    expect(result).toEqual([]);
  });

  it('should throw error if entity validation fails', async () => {
    const invalidUserEvent = {
      name: null, // Invalid
      deadline: new Date(),
      duration: '3 days',
      domicile: 'Jakarta',
      picture_url: 'https://example.com/pic.jpg',
      status: 'reject',
    };

    const mockRepository = {
      readByUsersIdAndStatus: jest.fn().mockResolvedValue([invalidUserEvent]),
    };

    GetUsersEventActivity.mockImplementation(() => {
      throw new Error('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLGetUsersEventsByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if repository throws error', async () => {
    const mockRepository = {
      readByUsersIdAndStatus: jest.fn().mockRejectedValue(new Error('Database Error')),
    };

    const useCase = new HOLGetUsersEventsByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('Database Error');
  });
});
