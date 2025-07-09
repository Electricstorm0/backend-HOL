class HOLCreateUsersInvolvementsUseCase {
  constructor({ HOLUsersInvolvementsRepository }) {
    this._HOLUsersInvolvementsRepository = HOLUsersInvolvementsRepository;
  }

  async execute(payload) {
    const { usersEventsHOLId, usersHOLId } = payload;
    const checkExistingInvolve = await this._HOLUsersInvolvementsRepository.readByUsersEventsId({ usersEventsHOLId });
    if (checkExistingInvolve) {
      throw new Error('Involvements sudah terdaftar');
    }

    const userInvolve = await this._HOLUsersInvolvementsRepository.create({
      usersEventsHOLId,
      usersHOLId,
    });
    return userInvolve;
  }
}
module.exports = HOLCreateUsersInvolvementsUseCase;
