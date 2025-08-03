/* eslint-disable no-undef */
const GetIYSFUseCase = require('../HOLGetIYSFUseCase');
const GetIYSF = require('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/GetIYSF');

jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/GetIYSF');

describe('GetIYSFUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate get IYSF list correctly with pagination', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(10),
    };

    const mockHolEventsIYSFRepository = {
      read: jest.fn().mockResolvedValue([
        {
          id_events_hol: 1,
          id_hol_events_type: 2,
          name: 'IYSF 2025',
          deadline: new Date('2025-10-10'),
          duration: '1 bulan',
          id_regencies: 303,
          description: 'International Youth...',
          benefit: 'Sertifikat & Networking',
          contact_person: '08123456789',
          logo_url: 'https://image.url/logo.png',
          position: 'Delegasi',
          position_category: 'Sains',
          event_date: new Date('2025-12-20'),
          requirements: 'Mahasiswa aktif',
        },
      ]),
    };

    const useCase = new GetIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    GetIYSF.mockImplementation((value) => value); // Bypass entity validation

    const payload = {
      page: 2,
      pageSize: 5,
      holEventsTypeId: 2,
    };

    const result = await useCase.execute(payload);

    expect(mockHolEventsRepository.readCountByProgramType).toBeCalledWith({ holEventsTypeId: 2 });
    expect(mockHolEventsIYSFRepository.read).toBeCalledWith({ skip: 5, numPerPage: 5, holEventsTypeId: 2 });

    expect(result).toEqual({
      result: [
        {
          id_events_hol: 1,
          id_hol_events_type: 2,
          name: 'IYSF 2025',
          deadline: new Date('2025-10-10'),
          duration: '1 bulan',
          id_regencies: 303,
          description: 'International Youth...',
          benefit: 'Sertifikat & Networking',
          contact_person: '08123456789',
          logo_url: 'https://image.url/logo.png',
          position: 'Delegasi',
          position_category: 'Sains',
          event_date: new Date('2025-12-20'),
          requirements: 'Mahasiswa aktif',
        },
      ],
      current: 1,
      perPage: 5,
      previous: 1,
      next: undefined, // karena offset 1 = last page (10/5 = 2 pages)
    });
  });

  it('should return empty result if repository returns null', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(5),
    };

    const mockHolEventsIYSFRepository = {
      read: jest.fn().mockResolvedValue(null),
    };

    const useCase = new GetIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    GetIYSF.mockImplementation((v) => v);

    const result = await useCase.execute({ page: 1, pageSize: 5, holEventsTypeId: 2 });

    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 5,
      previous: undefined,
      next: undefined,
    });
  });

  it('should throw error when GetIYSF entity validation fails', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(1),
    };

    const mockHolEventsIYSFRepository = {
      read: jest.fn().mockResolvedValue([{ name: null }]),
    };

    const useCase = new GetIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    GetIYSF.mockImplementation(() => {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    await expect(useCase.execute({ page: 1, pageSize: 1, holEventsTypeId: 2 })).rejects.toThrow('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should handle default pagination when no pageSize provided', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(3),
    };

    const mockHolEventsIYSFRepository = {
      read: jest.fn().mockResolvedValue([{ id_events_hol: 99, name: 'Default Page' }]),
    };

    const useCase = new GetIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    GetIYSF.mockImplementation((v) => v);

    const result = await useCase.execute({ page: 1, holEventsTypeId: 2 });

    expect(result.perPage).toBe(1); // default pageSize
    expect(result.current).toBe(0);
  });

  it('should handle string value page & pageSize', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(15),
    };

    const mockHolEventsIYSFRepository = {
      read: jest.fn().mockResolvedValue([{ id_events_hol: 88, name: 'StringPage' }]),
    };

    const useCase = new GetIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    GetIYSF.mockImplementation((v) => v);

    const result = await useCase.execute({ pageSize: '5', page: '2', holEventsTypeId: 2 });

    expect(mockHolEventsIYSFRepository.read).toBeCalledWith({
      skip: 5,
      numPerPage: 5,
      holEventsTypeId: 2,
    });

    expect(result.current).toBe(1);
  });

  it('should throw error if readCountByProgramType fails', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockRejectedValue(new Error('DB COUNT FAIL')),
    };

    const useCase = new GetIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: { read: jest.fn() },
    });

    await expect(useCase.execute({ page: 1, pageSize: 1, holEventsTypeId: 2 })).rejects.toThrow('DB COUNT FAIL');
  });

  it('should throw error if holEventsIYSFRepository.read fails', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(1),
    };

    const mockHolEventsIYSFRepository = {
      read: jest.fn().mockRejectedValue(new Error('DB READ FAIL')),
    };

    const useCase = new GetIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    await expect(useCase.execute({ page: 1, pageSize: 1, holEventsTypeId: 2 })).rejects.toThrow('DB READ FAIL');
  });
});
