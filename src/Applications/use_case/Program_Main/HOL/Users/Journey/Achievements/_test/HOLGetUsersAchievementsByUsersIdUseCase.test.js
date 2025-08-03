/* eslint-disable no-undef */
const HOLGetUsersAchievementsByUsersIdUseCase = require('../HOLGetUsersAchievementsByUsersIdUseCase');
const GetAchieve = require('../../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/GetAchievements');

jest.mock('../../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/GetAchievements');

describe('HOLGetUsersAchievementsByUsersIdUseCase', () => {
  const idParam = { id: 101 };

  const dummyAchievements = [
    {
      id: 1,
      id_users_hol: 101,
      events_name: 'Event A',
      events_year: 2022,
      bcf_contribution: 'Kontribusi A',
      achievements: 'Juara 1',
    },
    {
      id: 2,
      id_users_hol: 101,
      events_name: 'Event B',
      events_year: 2023,
      bcf_contribution: 'Kontribusi B',
      achievements: 'Juara Harapan',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of user achievements correctly', async () => {
    const mockRepo = {
      readByUsersId: jest.fn().mockResolvedValue(dummyAchievements),
    };

    // Mock entity agar tidak melempar error
    GetAchieve.mockImplementation((data) => data);

    const useCase = new HOLGetUsersAchievementsByUsersIdUseCase({
      holUsersAchievementsRepository: mockRepo,
    });

    const result = await useCase.execute(idParam);

    expect(mockRepo.readByUsersId).toBeCalledWith({ usersHOLId: 101 });
    expect(result).toEqual(dummyAchievements);
    expect(GetAchieve).toBeCalledTimes(2);
  });

  it('should return empty array if repository returns null', async () => {
    const mockRepository = {
      readByUsersId: jest.fn().mockResolvedValue(null),
    };

    const useCase = new HOLGetUsersAchievementsByUsersIdUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    const result = await useCase.execute({ id: 1 });

    expect(result).toEqual([]);
  });

  it('should throw error when GetAchieve validation fails', async () => {
    const mockRepo = {
      readByUsersId: jest.fn().mockResolvedValue([
        { events_name: null }, // invalid payload
      ]),
    };

    GetAchieve.mockImplementation(() => {
      throw new Error('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLGetUsersAchievementsByUsersIdUseCase({
      holUsersAchievementsRepository: mockRepo,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
