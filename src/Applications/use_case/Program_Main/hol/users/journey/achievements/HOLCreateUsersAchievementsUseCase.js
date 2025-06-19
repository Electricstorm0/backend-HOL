class HOLCreateUsersAchievementsUseCase {
  constructor({ HOLUsersAchievementsRepository }) {
    this._HOLUsersAchievementsRepository = HOLUsersAchievementsRepository;
  }

  async execute(payload) {
    const { holUsersId, eventsName, eventsYear, bcfContribution, achievements } = payload;

    const userAchieve = await this._HOLUsersAchievementsRepository.create({
      holUsersId,
      eventsName,
      eventsYear,
      bcfContribution,
      achievements,
    });
    return userAchieve;
  }
}
module.exports = HOLCreateUsersAchievementsUseCase;
