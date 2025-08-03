/* eslint-disable no-undef */
const HOLUpdateAchievementsUsersUseCase = require('../HOLUpdateUsersAchievementsUseCase');
const UpdateAchievements = require('../../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/UpdateAchievements');

jest.mock('../../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/UpdateAchievements');

describe('HOLUpdateAchievementsUsersUseCase', () => {
  const idParam = { id: 1 };
  const validPayload = {
    usersId: 101,
    eventsName: 'Kompetisi A',
    eventsYear: 2023,
    bcfContribution: 'Pembicara',
    achievements: 'Juara 1',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate the update achievement action correctly (happy path)', async () => {
    const mockRepository = {
      update: jest.fn(),
    };

    UpdateAchievements.mockImplementation((payload) => payload);

    const useCase = new HOLUpdateAchievementsUsersUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    await useCase.execute(idParam, validPayload);

    expect(UpdateAchievements).toBeCalledWith(validPayload);
    expect(mockRepository.update).toBeCalledWith({
      id: 1,
      payload: validPayload,
    });
  });

  it('should throw error if UpdateAchievements entity validation fails', async () => {
    const mockRepository = {
      update: jest.fn(),
    };

    UpdateAchievements.mockImplementation(() => {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLUpdateAchievementsUsersUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam, {})).rejects.toThrow('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(mockRepository.update).not.toBeCalled();
  });

  it('should throw error if repository update fails', async () => {
    const mockRepository = {
      update: jest.fn().mockRejectedValue(new Error('DB update error')),
    };

    UpdateAchievements.mockImplementation((payload) => payload);

    const useCase = new HOLUpdateAchievementsUsersUseCase({
      holUsersAchievementsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam, validPayload)).rejects.toThrow('DB update error');
  });
});
