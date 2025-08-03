/* eslint-disable no-undef */
const HOLGetUsersEventsByEventsIdUseCase = require('../HOLGetUsersEventsByEventsIdUseCase');
const GetUsersEvents = require('../../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

describe('HOLGetUsersEventsByEventsIdUseCase', () => {
  const eventsHOLId = 1001;
  const payload = {
    pageSize: '3',
    page: '2',
    eventsHOLId,
  };

  const dummyUsers = [
    {
      id_users_hol: 1,
      id_events_hol: eventsHOLId,
      Alumni_Name: 'John Doe',
      Program: 'Program A',
      batch: 'B1',
      Year: 2023,
      domicile: 'Jakarta',
      attendance: true,
      status: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return users with pagination correctly', async () => {
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsId: jest.fn().mockResolvedValue(6), // total 6 users
      readUsersEventsByEventsId: jest.fn().mockResolvedValue(dummyUsers),
    };

    const useCase = new HOLGetUsersEventsByEventsIdUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    // Mock entity
    GetUsersEvents.mockImplementation((value) => value);

    const result = await useCase.execute(payload);

    expect(mockHolUsersEventsRepository.readCountUsersEventsByEventsId).toBeCalledWith({ eventsHOLId });
    expect(mockHolUsersEventsRepository.readUsersEventsByEventsId).toBeCalledWith({
      skip: 3, // (2 - 1) * 3
      numPerPage: 3,
      eventsHOLId,
    });

    expect(result).toEqual({
      result: dummyUsers,
      current: 1,
      perPage: 3,
      previous: 1,
      next: undefined,
    });
    // total = 6, per page = 3 → 2 pages, so next page exists
  });

  it('should handle empty result gracefully', async () => {
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsId: jest.fn().mockResolvedValue(0),
      readUsersEventsByEventsId: jest.fn().mockResolvedValue([]),
    };

    const useCase = new HOLGetUsersEventsByEventsIdUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    GetUsersEvents.mockImplementation((val) => val);

    const result = await useCase.execute(payload);

    expect(result).toEqual({
      result: [],
      current: 1,
      perPage: 3,
      previous: 1,
      next: undefined,
    });
  });

  it('should fallback to default pagination values on invalid input', async () => {
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsId: jest.fn().mockResolvedValue(2),
      readUsersEventsByEventsId: jest.fn().mockResolvedValue(dummyUsers),
    };

    const useCase = new HOLGetUsersEventsByEventsIdUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    GetUsersEvents.mockImplementation((val) => val);

    const result = await useCase.execute({
      pageSize: 'invalid',
      page: 'invalid',
      eventsHOLId,
    });

    expect(result.perPage).toBe(1);
    expect(result.current).toBe(0);
  });

  it('should throw error when entity validation fails', async () => {
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsId: jest.fn().mockResolvedValue(1),
      readUsersEventsByEventsId: jest.fn().mockResolvedValue([{ id_users_hol: null }]),
    };

    const useCase = new HOLGetUsersEventsByEventsIdUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    GetUsersEvents.mockImplementation(() => {
      throw new Error('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    await expect(useCase.execute(payload)).rejects.toThrow('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
