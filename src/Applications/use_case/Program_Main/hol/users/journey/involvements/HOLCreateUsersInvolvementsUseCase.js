class HOLCreateUsersInvolvementsUseCase {
  constructor({ HOLUsersInvolvementsRepository }) {
    this._HOLUsersInvolvementsRepository = HOLUsersInvolvementsRepository;
  }

  async execute(payload) {
    const { usersEventsHOLId, usersHOLId } = payload;
    const userInvolve = await this._HOLUsersInvolvementsRepository.create({
      usersEventsHOLId,
      usersHOLId,
    });
    return userInvolve;
  }
}
module.exports = HOLCreateUsersInvolvementsUseCase;
