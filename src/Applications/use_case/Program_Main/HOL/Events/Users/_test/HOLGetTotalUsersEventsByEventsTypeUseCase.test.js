/* eslint-disable no-undef */
const HOLGetTotalUsersEventsByEventsTypeUseCase = require('../HOLGetTotalUsersEventsByEventsTypeUseCase');

describe('HOLGetTotalUsersEventsByEventsTypeUseCase', () => {
  it('should return total users by holEventsTypeId', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsTypeId: jest.fn().mockResolvedValue({ total: 25 }),
    };

    const useCase = new HOLGetTotalUsersEventsByEventsTypeUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const params = { holEventsTypeId: 3 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(mockHolUsersEventsRepository.readCountUsersEventsByEventsTypeId).toBeCalledWith({ holEventsTypeId: 3 });
    expect(result).toEqual({ total: 25 });
  });

  it('should throw error when repository fails', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      readCountUsersEventsByEventsTypeId: jest.fn().mockRejectedValue(new Error('DB error')),
    };

    const useCase = new HOLGetTotalUsersEventsByEventsTypeUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const params = { holEventsTypeId: 4 };

    // Act & Assert
    await expect(useCase.execute(params)).rejects.toThrow('DB error');
    expect(mockHolUsersEventsRepository.readCountUsersEventsByEventsTypeId).toBeCalledWith({ holEventsTypeId: 4 });
  });
});
