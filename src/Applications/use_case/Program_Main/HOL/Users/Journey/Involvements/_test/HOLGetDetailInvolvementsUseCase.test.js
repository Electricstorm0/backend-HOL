/* eslint-disable no-undef */
const HOLGetDetailInvolvementsUseCase = require('../HOLGetDetailInvolvementsUseCase');

describe('HOLGetDetailInvolvementsUseCase', () => {
  const idParam = { id: 101 };

  it('should return user involvement details when data exists', async () => {
    const mockData = [
      {
        usersHOLId: 101,
        eventsHOLId: 202,
        attendance: true,
        status: 1,
        name: 'Nama Event',
      },
    ];

    const mockRepository = {
      readByUsersIdAndAttendance: jest.fn().mockResolvedValue(mockData),
    };

    const useCase = new HOLGetDetailInvolvementsUseCase({
      holUsersEventsRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);

    expect(mockRepository.readByUsersIdAndAttendance).toBeCalledWith({ usersHOLId: 101 });
    expect(result).toEqual(mockData);
  });

  it('should return empty array when repository returns null', async () => {
    const mockRepository = {
      readByUsersIdAndAttendance: jest.fn().mockResolvedValue(null),
    };

    const useCase = new HOLGetDetailInvolvementsUseCase({
      holUsersEventsRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);

    expect(mockRepository.readByUsersIdAndAttendance).toBeCalledWith({ usersHOLId: 101 });
    expect(result).toEqual([]);
  });
});
