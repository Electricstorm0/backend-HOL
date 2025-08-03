/* eslint-disable no-undef */
const GetCFFByIdUseCase = require('../HOLGetCFFByIdUseCase');
const GetCFF = require('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/GetCFF');

jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/GetCFF');

describe('GetCFFByIdUseCase', () => {
  const mockId = { id: 'cff-123' };

  const mockCFFData = {
    id_events_hol: 'cff-123',
    id_hol_events_type: 1,
    name: 'Call for Fellows',
    deadline: new Date(),
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate the get CFF by id correctly (happy path)', async () => {
    const mockHolEventsCFFRepository = {
      readById: jest.fn().mockResolvedValue(mockCFFData),
    };

    GetCFF.mockImplementation((data) => data);

    const useCase = new GetCFFByIdUseCase({
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    const result = await useCase.execute(mockId);

    expect(mockHolEventsCFFRepository.readById).toBeCalledWith({ id: 'cff-123' });
    expect(result).toEqual(mockCFFData);
  });

  it('should throw error if GetCFF entity validation fails', async () => {
    const mockHolEventsCFFRepository = {
      readById: jest.fn().mockResolvedValue({ name: null }), // invalid
    };

    GetCFF.mockImplementation(() => {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new GetCFFByIdUseCase({
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(mockId)).rejects.toThrow('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if repository fails', async () => {
    const mockHolEventsCFFRepository = {
      readById: jest.fn().mockRejectedValue(new Error('DB read error')),
    };

    const useCase = new GetCFFByIdUseCase({
      holEventsCFFRepository: mockHolEventsCFFRepository,
    });

    await expect(useCase.execute(mockId)).rejects.toThrow('DB read error');
  });
});
