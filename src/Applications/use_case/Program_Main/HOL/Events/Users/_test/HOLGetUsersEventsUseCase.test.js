/* eslint-disable no-undef */
const HOLGetUsersEventsUseCase = require('../HOLGetUsersEventsUseCase');
const GetUsersEvents = require('../../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

describe('HOLGetUsersEventsUseCase', () => {
  const dummyUsers = [
    {
      id_users_hol: 1,
      id_events_hol: 10,
      Alumni_Name: 'John Doe',
      Program: 'Teknik Informatika',
      batch: 2020,
      Year: 2024,
      domicile: 'Jakarta',
      attendance: 1,
      status: 1,
    },
    {
      id_users_hol: 2,
      id_events_hol: 10,
      Alumni_Name: 'Jane Doe',
      Program: 'Sistem Informasi',
      batch: 2021,
      Year: 2024,
      domicile: 'Bandung',
      attendance: 0,
      status: 0,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users events successfully', async () => {
    // Arrange
    const mockRepository = {
      read: jest.fn().mockResolvedValue(dummyUsers),
    };

    GetUsersEvents.mockImplementation((payload) => payload);

    const useCase = new HOLGetUsersEventsUseCase({
      holUsersEventsRepository: mockRepository,
    });

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockRepository.read).toBeCalled();
    expect(result).toEqual(dummyUsers);
    expect(GetUsersEvents).toBeCalledTimes(dummyUsers.length);
  });

  it('should return empty array if repository returns empty result', async () => {
    const mockRepository = {
      read: jest.fn().mockResolvedValue([]),
    };

    const useCase = new HOLGetUsersEventsUseCase({
      holUsersEventsRepository: mockRepository,
    });

    GetUsersEvents.mockImplementation((payload) => payload);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(GetUsersEvents).not.toBeCalled();
  });

  it('should throw error if entity validation fails', async () => {
    const mockRepository = {
      read: jest.fn().mockResolvedValue([{ id_users_hol: null }]), // invalid payload
    };

    GetUsersEvents.mockImplementation(() => {
      throw new Error('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLGetUsersEventsUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute()).rejects.toThrow('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if repository throws', async () => {
    const mockRepository = {
      read: jest.fn().mockRejectedValue(new Error('DB Error')),
    };

    const useCase = new HOLGetUsersEventsUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute()).rejects.toThrow('DB Error');
  });
});
