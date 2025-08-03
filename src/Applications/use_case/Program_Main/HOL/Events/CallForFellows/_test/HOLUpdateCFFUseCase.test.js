/* eslint-disable no-undef */
const UpdateCFFUseCase = require('../HOLUpdateCFFUseCase');
const updateEvents = require('../../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateCFF = require('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/UpdateCFF');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/UpdateCFF');

describe('UpdateCFFUseCase', () => {
  const payload = {
    name: 'Updated CFF',
    deadline: '2025-12-31',
    duration: '3 bulan',
    regenciesId: 101,
    description: 'Deskripsi update',
    benefit: 'Pengalaman dan jejaring',
    contact_person: '08123456789',
    logo_url: 'https://logo.com/image.png',
    position: 'Ketua',
    category: 'Relawan',
    placements: 'Sumatera',
    register_url: 'https://register.url',
    requirements: 'Minimal semester 4',
  };

  const id = { id: 'cff-123' };

  it('should orchestrate the update CFF correctly (happy path)', async () => {
    const mockHolEventsRepository = {
      update: jest.fn().mockResolvedValue(),
    };
    const mockHolEventsCFFRepository = {
      update: jest.fn().mockResolvedValue(),
    };

    updateEvents.mockImplementation(() => ({}));
    updateCFF.mockImplementation(() => ({}));

    const useCase = new UpdateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await useCase.execute(id, payload);

    expect(mockHolEventsRepository.update).toBeCalledWith({ id: 'cff-123', payload: {} });
    expect(mockHolEventsCFFRepository.update).toBeCalledWith({ id: 'cff-123', payload: {} });
  });

  it('should throw error if updateEvents entity validation fails', async () => {
    const mockHolEventsRepository = { update: jest.fn() };
    const mockHolEventsCFFRepository = { update: jest.fn() };

    updateEvents.mockImplementation(() => {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new UpdateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(mockHolEventsRepository.update).not.toBeCalled();
    expect(mockHolEventsCFFRepository.update).not.toBeCalled();
  });

  it('should throw error if updateCFF entity validation fails', async () => {
    const mockHolEventsRepository = { update: jest.fn().mockResolvedValue() };
    const mockHolEventsCFFRepository = { update: jest.fn() };

    updateEvents.mockImplementation(() => ({}));
    updateCFF.mockImplementation(() => {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new UpdateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(mockHolEventsRepository.update).toBeCalled();
    expect(mockHolEventsCFFRepository.update).not.toBeCalled();
  });

  it('should throw error if holEventsRepository.update fails', async () => {
    const mockHolEventsRepository = {
      update: jest.fn().mockRejectedValue(new Error('DB error update holEvents')),
    };
    const mockHolEventsCFFRepository = { update: jest.fn() };

    updateEvents.mockImplementation(() => ({}));
    updateCFF.mockImplementation(() => ({}));

    const useCase = new UpdateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('DB error update holEvents');
    expect(mockHolEventsCFFRepository.update).not.toBeCalled();
  });

  it('should throw error if holEventsCFFRepository.update fails', async () => {
    const mockHolEventsRepository = {
      update: jest.fn().mockResolvedValue(),
    };
    const mockHolEventsCFFRepository = {
      update: jest.fn().mockRejectedValue(new Error('DB error update CFF')),
    };

    updateEvents.mockImplementation(() => ({}));
    updateCFF.mockImplementation(() => ({}));

    const useCase = new UpdateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(id, payload)).rejects.toThrow('DB error update CFF');
    expect(mockHolEventsRepository.update).toBeCalled();
    expect(mockHolEventsCFFRepository.update).toBeCalled();
  });
});
