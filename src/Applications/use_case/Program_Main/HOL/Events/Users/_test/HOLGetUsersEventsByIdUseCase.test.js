/* eslint-disable no-undef */
const HOLGetUsersEventsByIdUseCase = require('../HOLGetUsersEventsByIdUseCase');
const GetUsersEvents = require('../../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

describe('HOLGetUsersEventsByIdUseCase', () => {
  const dummyUserEvent = {
    id_users_hol: 1,
    id_events_hol: 2,
    Alumni_Name: 'John Doe',
    Program: 'Teknik Informatika',
    batch: 2020,
    Year: 2024,
    domicile: 'Jakarta',
    attendance: 1,
    status: 1,
  };

  const idParam = { id: 123 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return valid GetUsersEvents entity if data exists', async () => {
    // Arrange
    const mockRepository = {
      readById: jest.fn().mockResolvedValue(dummyUserEvent),
    };

    GetUsersEvents.mockImplementation((payload) => payload); // mock entity untuk lewati validasi

    const useCase = new HOLGetUsersEventsByIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    // Act
    const result = await useCase.execute(idParam);

    // Assert
    expect(mockRepository.readById).toBeCalledWith(idParam);
    expect(result).toEqual(dummyUserEvent);
  });

  it('should return empty object if no user event found', async () => {
    const mockRepository = {
      readById: jest.fn().mockResolvedValue(undefined),
    };

    GetUsersEvents.mockImplementation(() => {
      throw new Error('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLGetUsersEventsByIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if repository throws error', async () => {
    const mockRepository = {
      readById: jest.fn().mockRejectedValue(new Error('Database Error')),
    };

    const useCase = new HOLGetUsersEventsByIdUseCase({
      holUsersEventsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('Database Error');
  });
});
