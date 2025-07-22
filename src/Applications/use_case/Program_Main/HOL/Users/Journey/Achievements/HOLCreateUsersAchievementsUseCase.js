class HOLCreateUsersAchievementsUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute(payload) {
    const { usersId, eventsName, eventsYear, bcfContribution, achievements } = payload;

    await this._holUsersAchievementsRepository.create({
      usersId,
      eventsName,
      eventsYear,
      bcfContribution,
      achievements,
    });
  }
}
module.exports = HOLCreateUsersAchievementsUseCase;
