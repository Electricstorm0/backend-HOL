/* eslint-disable no-undef */
const HOLGetUsersEventsStatusByUsersIdUseCase = require('../HOLGetUsersEventsStatusByUsersIdUseCase');
const GetUsersEventActivity = require('../../../../../../../Domains/program_main/hol/events/entities/GetUsersEventActivity');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/GetUsersEventActivity');

describe('HOLGetUsersEventsStatusByUsersIdUseCase', () => {
  const dummyUsersEvents = [
    {
      name: 'Tech Conference',
      deadline: new Date(),
      duration: '3 days',
      domicile: 'Jakarta',
      picture_url: 'https://example.com/pic1.jpg',
      category: 'IT',
      position: 'Speaker',
      event_date: new Date(),
      status: 'approve',
    },
    {
      name: 'Data Workshop',
      deadline: new Date(),
      duration: '2 days',
      domicile: 'Bandung',
      picture_url: 'https://example.com/pic2.jpg',
      category: 'Education',
      position: 'Participant',
      event_date: new Date(),
      status: 'checking',
    },
  ];

  const idParam = { id: 123 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return array of GetUsersEventActivity entities if data exists', async () => {
    // Arrange
    const mockRepository = {
      readByUsersId: jest.fn().mockResolvedValue(dummyUsersEvents),
    };

    // Mock entity agar tidak menjalankan validasi aslinya
    GetUsersEventActivity.mockImplementation((payload) => payload);

    const useCase = new HOLGetUsersEventsStatusByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    // Act
    const result = await useCase.execute(idParam);

    // Assert
    expect(mockRepository.readByUsersId).toHaveBeenCalledWith({ usersId: idParam.id });
    expect(result).toEqual(dummyUsersEvents);
    expect(GetUsersEventActivity).toHaveBeenCalledTimes(dummyUsersEvents.length);
  });

  it('should return empty array if no user events found', async () => {
    const mockRepository = {
      readByUsersId: jest.fn().mockResolvedValue([]),
    };

    GetUsersEventActivity.mockImplementation((payload) => payload);

    const useCase = new HOLGetUsersEventsStatusByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);
    expect(result).toEqual([]);
    expect(GetUsersEventActivity).not.toHaveBeenCalled();
  });

  it('should throw error if entity validation fails', async () => {
    const invalidUserEvent = {
      name: null, // Invalid field
      deadline: new Date(),
      duration: '2 days',
      domicile: 'Jakarta',
      picture_url: 'https://example.com/pic.jpg',
    };

    const mockRepository = {
      readByUsersId: jest.fn().mockResolvedValue([invalidUserEvent]),
    };

    GetUsersEventActivity.mockImplementation(() => {
      throw new Error('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLGetUsersEventsStatusByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if repository throws', async () => {
    const mockRepository = {
      readByUsersId: jest.fn().mockRejectedValue(new Error('DB Error')),
    };

    const useCase = new HOLGetUsersEventsStatusByUsersIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('DB Error');
  });
});
