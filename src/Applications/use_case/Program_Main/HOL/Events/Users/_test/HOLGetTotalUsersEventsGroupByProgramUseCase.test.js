/* eslint-disable no-undef */
const HOLGetTotalUsersEventsGroupByProgramUseCase = require('../HOLGetTotalUsersEventsGroupByProgramUseCase');

describe('HOLGetTotalUsersEventsGroupByProgramUseCase', () => {
  it('should return grouped users count by program', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      readCountUsersEventsGroupByProgram: jest.fn().mockResolvedValue([
        { program: 'Program A', total: 10 },
        { program: 'Program B', total: 5 },
      ]),
    };

    const useCase = new HOLGetTotalUsersEventsGroupByProgramUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const params = { eventsHOLId: 1, status: 1 };

    // Act
    const result = await useCase.execute(params);

    // Assert
    expect(mockHolUsersEventsRepository.readCountUsersEventsGroupByProgram).toBeCalledWith({ eventsHOLId: 1, status: 1 });
    expect(result).toEqual([
      { program: 'Program A', total: 10 },
      { program: 'Program B', total: 5 },
    ]);
  });

  it('should throw error when repository throws error', async () => {
    // Arrange
    const mockHolUsersEventsRepository = {
      readCountUsersEventsGroupByProgram: jest.fn().mockRejectedValue(new Error('Database Error')),
    };

    const useCase = new HOLGetTotalUsersEventsGroupByProgramUseCase({
      holUsersEventsRepository: mockHolUsersEventsRepository,
    });

    const params = { eventsHOLId: 2, status: 0 };

    // Act & Assert
    await expect(useCase.execute(params)).rejects.toThrow('Database Error');
    expect(mockHolUsersEventsRepository.readCountUsersEventsGroupByProgram).toBeCalledWith({ eventsHOLId: 2, status: 0 });
  });
});
