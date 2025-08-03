/* eslint-disable no-undef */
const GetCFFUseCase = require('../HOLGetCFFUseCase');
const GetCFF = require('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/GetCFF');

jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/GetCFF');

describe('GetCFFUseCase', () => {
  const dummyEventData = [
    {
      id_events_hol: 'event-123',
      id_hol_events_type: 1,
      name: 'Call for Fellows',
      deadline: new Date('2025-12-01'),
      duration: '2 bulan',
      id_regencies: 101,
      description: 'Deskripsi',
      benefit: 'Pengalaman',
      contact_person: '08123456789',
      logo_url: 'https://image.url/logo.png',
      position: 'Panitia',
      category: 'Pengabdian',
      placements: 'Jawa',
      register_url: 'https://daftar.com',
      requirements: 'Syarat lengkap',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate get CFF events correctly with pagination', async () => {
    // Arrange
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(5), // total rows
    };
    const mockHolEventsCFFRepository = {
      read: jest.fn().mockResolvedValue(dummyEventData),
    };
    const useCase = new GetCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    GetCFF.mockImplementation((payload) => payload);

    const result = await useCase.execute({
      pageSize: '2',
      page: 2,
      holEventsTypeId: 1,
    });

    expect(mockHolEventsRepository.readCountByProgramType).toBeCalledWith({ holEventsTypeId: 1 });
    expect(mockHolEventsCFFRepository.read).toBeCalledWith({
      skip: 2,
      numPerPage: 2,
      holEventsTypeId: 1,
    });

    expect(result).toEqual({
      result: dummyEventData,
      current: 1,
      perPage: 2,
      previous: 1,
      next: 2,
    });
  });

  it('should return empty result if repository returns empty array', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(0),
    };
    const mockHolEventsCFFRepository = {
      read: jest.fn().mockResolvedValue([]),
    };
    const useCase = new GetCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    GetCFF.mockImplementation((payload) => payload);

    const result = await useCase.execute({
      pageSize: '5',
      page: 1,
      holEventsTypeId: 1,
    });

    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 5,
      previous: undefined,
      next: undefined,
    });
  });

  it('should handle null repository result', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(3),
    };
    const mockHolEventsCFFRepository = {
      read: jest.fn().mockResolvedValue(null),
    };
    const useCase = new GetCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    GetCFF.mockImplementation((payload) => payload);

    const result = await useCase.execute({
      pageSize: '3',
      page: 1,
      holEventsTypeId: 1,
    });

    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 3,
      previous: undefined,
      next: undefined,
    });
  });

  it('should handle validation error from entity', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(1),
    };
    const mockHolEventsCFFRepository = {
      read: jest.fn().mockResolvedValue([{ name: null }]),
    };
    const useCase = new GetCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    GetCFF.mockImplementation(() => {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    await expect(useCase.execute({ pageSize: '2', page: 1, holEventsTypeId: 1 })).rejects.toThrow('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should handle error when readCountByProgramType fails', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockRejectedValue(new Error('DB error count')),
    };
    const mockHolEventsCFFRepository = {
      read: jest.fn(),
    };
    const useCase = new GetCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute({ pageSize: '3', page: 1, holEventsTypeId: 1 })).rejects.toThrow('DB error count');
    expect(mockHolEventsCFFRepository.read).not.toBeCalled();
  });

  it('should handle error when holEventsCFFRepository.read fails', async () => {
    const mockHolEventsRepository = {
      readCountByProgramType: jest.fn().mockResolvedValue(2),
    };
    const mockHolEventsCFFRepository = {
      read: jest.fn().mockRejectedValue(new Error('DB error read')),
    };
    const useCase = new GetCFFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute({ pageSize: '1', page: 1, holEventsTypeId: 1 })).rejects.toThrow('DB error read');
  });
});
