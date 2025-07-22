const GetUsersAchieve = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/GetAchievements');

class HOLGetUsersAchievementsByUsersIdUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute({ id: usersHOLId }) {
    const achieve = (await this._holUsersAchievementsRepository.readByUsersId({ usersHOLId })) || {};
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

module.exports = HOLGetUsersAchievementsByUsersIdUseCase;
