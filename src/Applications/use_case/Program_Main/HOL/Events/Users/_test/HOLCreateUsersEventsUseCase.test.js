/* eslint-disable no-undef */
const HOLCreateUsersEventsUseCase = require('../HOLCreateUsersEventsUseCase');
const InvariantError = require('../../../../../../../Commons/exceptions/InvariantError');

describe('HOLCreateUsersEventsUseCase', () => {
  const usersHOLId = 'user-123';
  const eventsHOLId = 'event-456';

  it('should register user if not already registered (status = 1)', async () => {
    const mockHolUsersEventsRepository = {
      checkRegisteredUsersEvents: jest.fn().mockResolvedValue(false),
      create: jest.fn().mockResolvedValue('user-event-789'),
    };

    const mockHolEventsRepository = {
      readEventsTypeAndPositionByEventsId: jest.fn().mockResolvedValue([
        {
          id_hol_events_type: 1,
          position: 'anggota',
        },
      ]),
    };

    const useCase = new HOLCreateUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
      holEventsRepository: mockHolEventsRepository,
    });

    const result = await useCase.execute({ id: usersHOLId }, { eventsHOLId });

    expect(result).toEqual('user-event-789');
    expect(mockHolUsersEventsRepository.checkRegisteredUsersEvents).toBeCalledWith({ usersHOLId, eventsHOLId });
    expect(mockHolEventsRepository.readEventsTypeAndPositionByEventsId).toBeCalledWith({ eventsHOLId });
    expect(mockHolUsersEventsRepository.create).toBeCalledWith({
      usersHOLId,
      eventsHOLId,
      status: 1,
    });
  });
  it('should register user with status = 0 if event type is 3 and position is panitia', async () => {
    const mockHolUsersEventsRepository = {
      checkRegisteredUsersEvents: jest.fn().mockResolvedValue(false),
      create: jest.fn().mockResolvedValue('user-event-890'),
    };

    const mockHolEventsRepository = {
      readEventsTypeAndPositionByEventsId: jest.fn().mockResolvedValue([
        {
          id_hol_events_type: 3,
          position: 'panitia',
        },
      ]),
    };

    const useCase = new HOLCreateUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
      holEventsRepository: mockHolEventsRepository,
    });

    const result = await useCase.execute({ id: usersHOLId }, { eventsHOLId });

    expect(result).toEqual('user-event-890');
    expect(mockHolUsersEventsRepository.create).toBeCalledWith({
      usersHOLId,
      eventsHOLId,
      status: 0,
    });
  });
  it('should throw InvariantError if user has already registered', async () => {
    const mockHolUsersEventsRepository = {
      checkRegisteredUsersEvents: jest.fn().mockResolvedValue(true),
    };

    const mockHolEventsRepository = {
      readEventsTypeAndPositionByEventsId: jest.fn(),
    };

    const useCase = new HOLCreateUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
      holEventsRepository: mockHolEventsRepository,
    });

    await expect(useCase.execute({ id: usersHOLId }, { eventsHOLId })).rejects.toThrowError(InvariantError);

    expect(mockHolUsersEventsRepository.checkRegisteredUsersEvents).toBeCalledWith({ usersHOLId, eventsHOLId });
    expect(mockHolEventsRepository.readEventsTypeAndPositionByEventsId).not.toBeCalled();
  });
});
