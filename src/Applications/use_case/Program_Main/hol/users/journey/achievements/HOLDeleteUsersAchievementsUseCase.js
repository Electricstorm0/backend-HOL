class HOLDeleteUsersAchievementsUseCase {
  constructor({ HOLUsersAchievementsRepository }) {
    this._HOLUsersAchievementsRepository = HOLUsersAchievementsRepository;
  }

  async execute({ id }) {
    const users = await this._HOLUsersAchievementsRepository.delete({ id });
    return users;
  }
}
module.exports = HOLDeleteUsersAchievementsUseCase;
