class HOLDeleteUsersAchievementsUseCase {
  constructor({ holUsersAchievementsRepository }) {
    this._holUsersAchievementsRepository = holUsersAchievementsRepository;
  }

  async execute({ id }) {
    const users = await this._holUsersAchievementsRepository.delete({ id });
    return users;
  }
}
module.exports = HOLDeleteUsersAchievementsUseCase;
