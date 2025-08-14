/* eslint-disable no-undef */
const CreateCFFUseCase = require('../HOLCreateCFFUseCase');

describe('CreateCFFUseCase', () => {
  const payload = {
    holEventsTypeId: 1,
    pictureUrl: 'https://image.url/logo.png',
    name: 'Call for Fellows',
    deadline: '2025-10-01',
    duration: '2 bulan',
    regenciesId: 101,
    description: 'Deskripsi program',
    benefit: 'Pengalaman, jejaring',
    contact_person: '08123456789',
    position: 'Panitia',
    category: 'Pengabdian',
    placements: 'Jawa, Sumatera',
    registerUrl: 'https://link.daftar.com',
    requirements: 'Minimal semester 5',
  };

  it('should orchestrate create CFF event correctly (happy path)', async () => {
    const mockHolEventsRepository = {
      create: jest.fn().mockResolvedValue('event-123'),
    };
    const mockHolEventsCFFRepository = {
      create: jest.fn().mockResolvedValue(),
    };

    const useCase = new CreateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toBeCalledWith({
      holEventsTypeId: 1,
      pictureUrl: 'https://image.url/logo.png',
      name: 'Call for Fellows',
      deadline: '2025-10-01',
      duration: '2 bulan',
      regenciesId: 101,
      description: 'Deskripsi program',
      benefit: 'Pengalaman, jejaring',
      contact_person: '08123456789',
    });

    expect(mockHolEventsCFFRepository.create).toBeCalledWith({
      holEventsId: 'event-123',
      position: 'Panitia',
      category: 'Pengabdian',
      placements: 'Jawa, Sumatera',
      registerUrl: 'https://link.daftar.com',
      requirements: 'Minimal semester 5',
    });
  });

  it('should throw error when holEventsRepository.create fails', async () => {
    const mockHolEventsRepository = {
      create: jest.fn().mockRejectedValue(new Error('DB error saat create event')),
    };
    const mockHolEventsCFFRepository = {
      create: jest.fn(),
    };

    const useCase = new CreateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(payload)).rejects.toThrow('DB error saat create event');
    expect(mockHolEventsCFFRepository.create).not.toBeCalled();
  });

  it('should throw error when holEventsCFFRepository.create fails', async () => {
    const mockHolEventsRepository = {
      create: jest.fn().mockResolvedValue('event-123'),
    };
    const mockHolEventsCFFRepository = {
      create: jest.fn().mockRejectedValue(new Error('DB error saat create detail CFF')),
    };

    const useCase = new CreateCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(payload)).rejects.toThrow('DB error saat create detail CFF');
    expect(mockHolEventsRepository.create).toBeCalled();
  });
});
