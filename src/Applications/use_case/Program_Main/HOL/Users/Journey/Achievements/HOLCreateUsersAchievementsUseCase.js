class HOLCreateUsersAchievementsUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute(payload) {
    const { holUsersId, eventsName, eventsYear, bcfContribution, achievements } = payload;

    await this._holUsersAchievementsRepository.create({
      holUsersId,
      eventsName,
      eventsYear,
      bcfContribution,
      achievements,
    });
  }
}
module.exports = HOLCreateUsersAchievementsUseCase;
