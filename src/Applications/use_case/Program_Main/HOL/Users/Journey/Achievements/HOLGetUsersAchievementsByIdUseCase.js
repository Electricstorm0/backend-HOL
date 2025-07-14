const GetUsersAchieve = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/GetAchievements');

class HOLGetUsersAchievementsByIdUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute({ id }) {
    const achieve = (await this._holUsersAchievementsRepository.readById({ id })) || {};
    const result = new GetUsersAchieve({ ...achieve });
    return result;
  }
}

module.exports = HOLGetUsersAchievementsByIdUseCase;
