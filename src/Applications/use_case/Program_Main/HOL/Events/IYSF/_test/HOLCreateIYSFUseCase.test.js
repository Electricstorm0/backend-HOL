/* eslint-disable no-undef */
const CreateIYSFUseCase = require('../HOLCreateIYSFUseCase');

describe('CreateIYSFUseCase', () => {
  const payload = {
    holEventsTypeId: 3,
    pictureUrl: 'https://image.url/iysf-logo.png',
    name: 'IYSF Program',
    deadline: '2025-11-01',
    duration: '1 bulan',
    regenciesId: 202,
    description: 'Deskripsi IYSF',
    benefit: 'Pengalaman, relasi',
    contact_person: '08987654321',
    position: 'Delegasi',
    positionCategory: 'Sains',
    eventDate: '2025-12-15',
    requirements: 'Mahasiswa aktif',
  };

  it('should orchestrate create IYSF event correctly (happy path)', async () => {
    const mockHolEventsRepository = {
      create: jest.fn().mockResolvedValue('event-iysf-123'),
    };
    const mockHolEventsIYSFRepository = {
      create: jest.fn().mockResolvedValue(),
    };

    const useCase = new CreateIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    await useCase.execute(payload);

    expect(mockHolEventsRepository.create).toBeCalledWith({
      holEventsTypeId: 3,
      pictureUrl: 'https://image.url/iysf-logo.png',
      name: 'IYSF Program',
      deadline: '2025-11-01',
      duration: '1 bulan',
      regenciesId: 202,
      description: 'Deskripsi IYSF',
      benefit: 'Pengalaman, relasi',
      contact_person: '08987654321',
    });

    expect(mockHolEventsIYSFRepository.create).toBeCalledWith({
      holEventsId: 'event-iysf-123',
      position: 'Delegasi',
      positionCategory: 'Sains',
      eventDate: '2025-12-15',
      requirements: 'Mahasiswa aktif',
    });
  });

  it('should throw error when holEventsRepository.create fails', async () => {
    const mockHolEventsRepository = {
      create: jest.fn().mockRejectedValue(new Error('DB error saat create event')),
    };
    const mockHolEventsIYSFRepository = {
      create: jest.fn(),
    };

    const useCase = new CreateIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    await expect(useCase.execute(payload)).rejects.toThrow('DB error saat create event');
    expect(mockHolEventsIYSFRepository.create).not.toBeCalled();
  });

  it('should throw error when holEventsIYSFRepository.create fails', async () => {
    const mockHolEventsRepository = {
      create: jest.fn().mockResolvedValue('event-iysf-123'),
    };
    const mockHolEventsIYSFRepository = {
      create: jest.fn().mockRejectedValue(new Error('DB error saat create detail IYSF')),
    };

    const useCase = new CreateIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    await expect(useCase.execute(payload)).rejects.toThrow('DB error saat create detail IYSF');
    expect(mockHolEventsRepository.create).toBeCalled();
  });
});
