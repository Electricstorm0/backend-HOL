/* eslint-disable no-undef */
const HOLUpdateStatusUsersEventsUseCase = require('../HOLUpdateStatusUsersEventsUseCase');

describe('HOLUpdateStatusUsersEventsUseCase', () => {
  it('should orchestrate the update status users events action correctly', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      updateStatusUsersEvents: jest.fn().mockResolvedValue('success'),
    };

    const useCase = new HOLUpdateStatusUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const payload = {
      usersHOLId: 1,
      eventsHOLId: 101,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolUsersEventsRepository.updateStatusUsersEvents).toBeCalledWith({
      usersHOLId: 1,
      eventsHOLId: 101,
    });
    expect(result).toBe('success');
  });

  it('should throw error if repository throws', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      updateStatusUsersEvents: jest.fn().mockRejectedValue(new Error('Database error')),
    };

    const useCase = new HOLUpdateStatusUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const payload = {
      usersHOLId: 2,
      eventsHOLId: 202,
    };

    // Act & Assert
    await expect(useCase.execute(payload)).rejects.toThrow('Database error');
    expect(mockHolUsersEventsRepository.updateStatusUsersEvents).toBeCalledWith({
      usersHOLId: 2,
      eventsHOLId: 202,
    });
  });
});
