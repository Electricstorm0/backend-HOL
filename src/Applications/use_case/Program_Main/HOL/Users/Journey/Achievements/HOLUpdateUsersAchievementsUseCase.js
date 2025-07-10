const updateAchieve = require('../../../../../../../Domains/program_main/hol/temp-Users/journey/achievements/entities/UpdateAchievements');

class HOLUpdateAchievementsUsersUseCase {
  constructor({ HOLUsersAchievementsRepository }) {
    this._HOLUsersAchievementsRepository = HOLUsersAchievementsRepository;
  }

  async execute({ id }, payload) {
    const updatedachieve = new updateAchieve(payload);
    await this._HOLUsersAchievementsRepository.update({ id, payload: updatedachieve });
  }
}
module.exports = HOLUpdateAchievementsUsersUseCase;
