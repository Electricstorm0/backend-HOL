/* eslint-disable no-undef */
const HOLGetUsersUseCase = require('../HOLGetUsersUseCase');
const HolGetUsers = require('../../../../../../Domains/program_main/hol/users/entities/HolGetUsers');

jest.mock('../../../../../../Domains/program_main/hol/users/entities/HolGetUsers');

describe('HOLGetUsersUseCase', () => {
  it('should orchestrate the get users use case correctly with pagination', async () => {
    // Arrange
    const mockUsersData = [
      {
        id: 1,
        id_users: 101,
        id_batch: 2023,
        Alumni_Name: 'John Doe',
        program: 'Program A',
        batch: '2023',
        domisili: 'Jakarta',
      },
      {
        id: 2,
        id_users: 102,
        id_batch: 2022,
        Alumni_Name: 'Jane Smith',
        program: 'Program B',
        batch: '2022',
        domisili: 'Bandung',
      },
    ];

    const mockJourneys = [
      {
        id_users_hol: 101,
        recent_journey: 'Magang',
      },
      {
        id_users_hol: 102,
        recent_journey: 'Volunteer',
      },
    ];

    const expectedResults = mockUsersData.map((user) => ({
      ...user,
      photoProfile: 'profileKu.JPG',
      recent_journey: mockJourneys.find((j) => j.id_users_hol === user.id_users)?.recent_journey || null,
    }));

    // Mock implementasi entity untuk mengembalikan data sesuai input
    HolGetUsers.mockImplementation((value) => value);

    const mockHolUsersRepository = {
      readCountUsers: jest.fn().mockResolvedValue(10),
      read: jest.fn().mockResolvedValue(mockUsersData),
      readJourneyUsers: jest.fn().mockResolvedValue(mockJourneys),
    };

    const useCase = new HOLGetUsersUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    const payload = { pageSize: 2, page: 2 };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockHolUsersRepository.readCountUsers).toBeCalled();
    expect(mockHolUsersRepository.read).toBeCalledWith({ skip: 2, numPerPage: 2 });
    expect(mockHolUsersRepository.readJourneyUsers).toBeCalled();
    expect(result).toEqual({
      result: expectedResults,
      current: 1,
      perPage: 2,
      previous: 1,
      next: 2,
    });
  });

  it('should return correct result when repository returns empty', async () => {
    const mockHolUsersRepository = {
      readCountUsers: jest.fn().mockResolvedValue(0),
      read: jest.fn().mockResolvedValue([]),
      readJourneyUsers: jest.fn().mockResolvedValue([]),
    };

    HolGetUsers.mockImplementation((value) => value);

    const useCase = new HOLGetUsersUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    const result = await useCase.execute({ pageSize: 5, page: 1 });

    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 5,
      previous: undefined,
      next: undefined,
    });
  });
});
