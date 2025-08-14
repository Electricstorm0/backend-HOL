/* eslint-disable no-undef */
const UpdateIYSFUseCase = require('../HOLUpdateIYSFUseCase');
const updateEvents = require('../../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateIYSF = require('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/UpdateIYSF');

jest.mock('../../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
jest.mock('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/UpdateIYSF');

describe('UpdateIYSFUseCase', () => {
  const payload = {
    pictureUrl: 'https://img.url/logo.png',
    name: 'Updated Event',
    deadline: '2025-12-01',
    duration: '3 bulan',
    regenciesId: 1,
    description: 'Updated description',
    benefit: 'Updated benefit',
    contact_person: '08123456789',
    position: 'Panitia',
    positionCategory: 'Inovasi',
    eventDate: '2025-12-31',
    requirement: 'Minimal semester 5',
  };

  const idParam = { id: 'event-001' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate update IYSF correctly (happy path)', async () => {
    // Arrange
    const mockHolEventsRepository = {
      update: jest.fn().mockResolvedValue(),
    };
    const mockHolEventsIYSFRepository = {
      update: jest.fn().mockResolvedValue(),
    };

    updateEvents.mockImplementation((p) => p);
    updateIYSF.mockImplementation((p) => p);

    const useCase = new UpdateIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    // Act
    await useCase.execute(idParam, payload);

    // Assert
    expect(updateEvents).toBeCalledWith(payload);
    expect(updateIYSF).toBeCalledWith(payload);
    expect(mockHolEventsRepository.update).toBeCalledWith({ id: 'event-001', payload });
    expect(mockHolEventsIYSFRepository.update).toBeCalledWith({ id: 'event-001', payload });
  });

  it('should throw error if updateEvents entity validation fails', async () => {
    updateEvents.mockImplementation(() => {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new UpdateIYSFUseCase({
      holEventsRepository: {},
      holEventsIYSFRepository: {},
    });

    await expect(useCase.execute(idParam, {})).rejects.toThrow('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if updateIYSF entity validation fails', async () => {
    // Arrange
    updateEvents.mockImplementation((p) => p);
    updateIYSF.mockImplementation(() => {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const mockHolEventsRepository = {
      update: jest.fn(), // diperlukan agar tidak error
    };
    const mockHolEventsIYSFRepository = {
      update: jest.fn(),
    };

    const useCase = new UpdateIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    // Act & Assert
    await expect(useCase.execute(idParam, payload)).rejects.toThrow('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if repository update fails', async () => {
    updateEvents.mockImplementation((p) => p);
    updateIYSF.mockImplementation((p) => p);

    const mockHolEventsRepository = {
      update: jest.fn().mockRejectedValue(new Error('DB error at holEvents')),
    };
    const mockHolEventsIYSFRepository = {
      update: jest.fn(),
    };

    const useCase = new UpdateIYSFUseCase({
      holEventsRepository: mockHolEventsRepository,
      holEventsIYSFRepository: mockHolEventsIYSFRepository,
    });

    await expect(useCase.execute(idParam, payload)).rejects.toThrow('DB error at holEvents');
    expect(mockHolEventsIYSFRepository.update).not.toBeCalled();
  });
});
