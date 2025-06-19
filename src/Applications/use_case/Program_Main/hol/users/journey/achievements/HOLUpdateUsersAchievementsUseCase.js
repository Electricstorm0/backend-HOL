const updateAchieve = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/updateAchieve');

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
