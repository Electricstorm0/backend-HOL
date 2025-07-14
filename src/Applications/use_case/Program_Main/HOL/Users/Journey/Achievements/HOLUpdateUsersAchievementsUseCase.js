const updateAchieve = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/UpdateAchievements');

class HOLUpdateAchievementsUsersUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute({ id }, payload) {
    const updatedachieve = new updateAchieve(payload);
    await this._holUsersAchievementsRepository.update({ id, payload: updatedachieve });
  }
}
module.exports = HOLUpdateAchievementsUsersUseCase;
