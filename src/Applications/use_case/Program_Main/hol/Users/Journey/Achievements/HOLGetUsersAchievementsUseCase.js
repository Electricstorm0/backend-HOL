const GetUsersAchieve = require('../../../../../../../Domains/program_main/hol/temp-Users/Journey/Achievements/entities/GetAchievements');

class HOLGetUsersAchievementsUseCase {
  constructor({ HOLUsersAchievementsRepository }) {
    this._HOLUsersAchievementsRepository = HOLUsersAchievementsRepository;
  }

  async execute() {
    try {
      const achieve = await this._HOLUsersAchievementsRepository.read(); // misal typeId: 1 untuk CFF
      const result = await Promise.all(
        achieve.map(async (value) => ({
          ...new GetUsersAchieve({
            ...value,
          }),
        }))
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetUsersAchievementsUseCase;
