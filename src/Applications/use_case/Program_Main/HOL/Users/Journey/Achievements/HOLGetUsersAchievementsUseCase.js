const GetUsersAchieve = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/GetAchievements');

class HOLGetUsersAchievementsUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute() {
    const achieve = (await this._holUsersAchievementsRepository.read()) || [];
    const result = await Promise.all(
      achieve.map(async (value) => ({
        ...new GetUsersAchieve({
          ...value,
        }),
      }))
    );
    return result;
  }
}

module.exports = HOLGetUsersAchievementsUseCase;
