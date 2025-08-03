/* eslint-disable no-undef */
const GetIYSFByIdUseCase = require('../HOLGetIYSFByIdUseCase');
const GetIYSF = require('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/GetIYSF');

jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/GetIYSF');

describe('GetIYSFByIdUseCase', () => {
  const dummyPayload = {
    id: 'event-001',
  };

  const dummyEvent = {
    id_events_hol: 'event-001',
    id_hol_events_type: 3,
    name: 'IYSF 2025',
    deadline: new Date('2025-12-01'),
    duration: '1 bulan',
    id_regencies: 301,
    description: 'Deskripsi acara IYSF',
    benefit: 'Pengalaman dan relasi',
    contact_person: '08123456789',
    logo_url: 'https://img.com/logo.png',
    position: 'Delegasi',
    position_category: 'Inovasi',
    event_date: new Date('2025-12-15'),
    requirements: 'Minimal semester 3',
  };

  it('should return IYSF event data correctly (happy path)', async () => {
    // Arrange
    const mockRepository = {
      readById: jest.fn().mockResolvedValue(dummyEvent),
    };

    const useCase = new GetIYSFByIdUseCase({
      holEventsIYSFRepository: mockRepository,
    });

    GetIYSF.mockImplementation((payload) => payload); // Mock entity constructor

    // Act
    const result = await useCase.execute(dummyPayload);

    // Assert
    expect(mockRepository.readById).toBeCalledWith({ id: 'event-001' });
    expect(result).toEqual(dummyEvent);
  });

  it('should throw error if entity validation fails', async () => {
    const mockRepository = {
      readById: jest.fn().mockResolvedValue({ name: null }), // invalid payload
    };

    const useCase = new GetIYSFByIdUseCase({
      holEventsIYSFRepository: mockRepository,
    });

    GetIYSF.mockImplementation(() => {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    await expect(useCase.execute(dummyPayload)).rejects.toThrow('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if repository fails', async () => {
    const mockRepository = {
      readById: jest.fn().mockRejectedValue(new Error('DB error')),
    };

    const useCase = new GetIYSFByIdUseCase({
      holEventsIYSFRepository: mockRepository,
    });

    await expect(useCase.execute(dummyPayload)).rejects.toThrow('DB error');
  });
});
