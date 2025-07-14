class HOLCreateUsersAchievementsUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute(payload) {
    const { holUsersId, eventsName, eventsYear, bcfContribution, achievements } = payload;

    const userAchieve = await this._holUsersAchievementsRepository.create({
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
