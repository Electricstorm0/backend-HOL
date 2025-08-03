/* eslint-disable no-undef */
const UpdateBAUseCase = require('../HOLUpdateBAUseCase');
const updateEvents = require('../../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateBA = require('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/UpdateBA');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/UpdateBA');

describe('UpdateBAUseCase', () => {
  const payload = {
    name: 'Kegiatan Seru',
    deadline: '2025-09-01',
    duration: '3 hari',
    regenciesId: 101,
    description: 'Deskripsi event',
    benefit: 'Pengalaman dan relasi',
    contact_person: '08123456789',
    pictureUrl: 'https://image.url/gambar.jpg',
    category: 'Kepemudaan',
  };

  const id = { id: 'event-123' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate the update bonding activity correctly (happy path)', async () => {
    const mockHolEventsRepository = { update: jest.fn().mockResolvedValue() };
    const mockHolEventsBARepository = { update: jest.fn().mockResolvedValue() };

    updateEvents.mockImplementation(() => ({ mock: 'event' }));
    updateBA.mockImplementation(() => ({ mock: 'ba' }));

    const useCase = new UpdateBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    await useCase.execute(id, payload);

    expect(updateEvents).toBeCalledWith(payload);
    expect(updateBA).toBeCalledWith(payload);
    expect(mockHolEventsRepository.update).toBeCalledWith({ id: 'event-123', payload: { mock: 'event' } });
    expect(mockHolEventsBARepository.update).toBeCalledWith({ id: 'event-123', payload: { mock: 'ba' } });
  });

  it('should throw error when updateEvents payload is invalid', async () => {
    const mockHolEventsRepository = { update: jest.fn() };
    const mockHolEventsBARepository = { update: jest.fn() };

    updateEvents.mockImplementation(() => {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new UpdateBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(updateEvents).toBeCalled();
    expect(mockHolEventsRepository.update).not.toBeCalled();
    expect(mockHolEventsBARepository.update).not.toBeCalled();
  });

  it('should throw error when updateBA payload is invalid', async () => {
    const mockHolEventsRepository = { update: jest.fn().mockResolvedValue() };
    const mockHolEventsBARepository = { update: jest.fn() };

    updateEvents.mockImplementation(() => ({ mock: 'event' }));
    updateBA.mockImplementation(() => {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new UpdateBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(mockHolEventsRepository.update).toBeCalled(); // event tetap jalan
    expect(mockHolEventsBARepository.update).not.toBeCalled(); // BA gagal
  });

  it('should propagate error if holEventsRepository.update throws', async () => {
    const mockHolEventsRepository = {
      update: jest.fn().mockRejectedValue(new Error('DB error on event')),
    };
    const mockHolEventsBARepository = { update: jest.fn() };

    updateEvents.mockImplementation(() => ({ mock: 'event' }));
    updateBA.mockImplementation(() => ({ mock: 'ba' }));

    const useCase = new UpdateBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('DB error on event');
    expect(mockHolEventsBARepository.update).not.toBeCalled(); // karena gagal di awal
  });

  it('should propagate error if holEventsBARepository.update throws', async () => {
    const mockHolEventsRepository = {
      update: jest.fn().mockResolvedValue(),
    };
    const mockHolEventsBARepository = {
      update: jest.fn().mockRejectedValue(new Error('DB error on BA')),
    };

    updateEvents.mockImplementation(() => ({ mock: 'event' }));
    updateBA.mockImplementation(() => ({ mock: 'ba' }));

    const useCase = new UpdateBAUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsBARepository: mockHolEventsBARepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('DB error on BA');
    expect(mockHolEventsRepository.update).toBeCalled(); // event tetap berhasil
  });
});
