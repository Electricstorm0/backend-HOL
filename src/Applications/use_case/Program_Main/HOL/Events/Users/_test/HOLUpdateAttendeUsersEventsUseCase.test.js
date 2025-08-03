/* eslint-disable no-undef */
const HOLUpdateAttendeUsersEventsUseCase = require('../HOLUpdateAttendeUsersEventsUseCase');

describe('HOLUpdateAttendeUsersEventsUseCase', () => {
  it('should orchestrate the update attendance action correctly', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      updateAttendance: jest.fn().mockResolvedValue(),
    };

    const useCase = new HOLUpdateAttendeUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const idParam = { id: 101 };
    const payload = { eventsHOLId: 202 };

    // Act
    await useCase.execute(idParam, payload);

    // Assert
    expect(mockHolUsersEventsRepository.updateAttendance).toBeCalledWith({
      usersHOLId: 101,
      eventsHOLId: 202,
    });
    expect(mockHolUsersEventsRepository.updateAttendance).toBeCalledTimes(1);
  });

  it('should throw error if repository throws', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      updateAttendance: jest.fn().mockRejectedValue(new Error('DB Error')),
    };

    const useCase = new HOLUpdateAttendeUsersEventsUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const idParam = { id: 101 };
    const payload = { eventsHOLId: 202 };

    // Act & Assert
    await expect(useCase.execute(idParam, payload)).rejects.toThrow('DB Error');
    expect(mockHolUsersEventsRepository.updateAttendance).toBeCalledWith({
      usersHOLId: 101,
      eventsHOLId: 202,
    });
  });
});
