/* eslint-disable no-undef */
const HOLGetTotalUsersEventsByEventsIdAndStatusUseCase = require('../HOLGetTotalUsersEventsByEventsIdAndStatusUseCase');

describe('HOLGetTotalUsersEventsByEventsIdAndStatusUseCase', () => {
  it('should return total users by eventsHOLId and status', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsIdAndStatus: jest.fn().mockResolvedValue({ total: 12 }),
    };

    const useCase = new HOLGetTotalUsersEventsByEventsIdAndStatusUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const params = { eventsHOLId: 1, status: 1 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(mockHolUsersEventsRepository.readCountUsersEventsByEventsIdAndStatus).toBeCalledWith({ eventsHOLId: 1, status: 1 });
    expect(result).toEqual({ total: 12 });
  });

  it('should throw error if repository fails', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsIdAndStatus: jest.fn().mockRejectedValue(new Error('DB error')),
    };

    const useCase = new HOLGetTotalUsersEventsByEventsIdAndStatusUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const params = { eventsHOLId: 2, status: 0 };

    // Act & Assert
    await expect(useCase.execute(params)).rejects.toThrow('DB error');
    expect(mockHolUsersEventsRepository.readCountUsersEventsByEventsIdAndStatus).toBeCalledWith({ eventsHOLId: 2, status: 0 });
  });
});
