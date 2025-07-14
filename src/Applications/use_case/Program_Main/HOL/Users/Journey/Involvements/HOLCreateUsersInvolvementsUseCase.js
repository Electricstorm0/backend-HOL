class HOLCreateUsersInvolvementsUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute(payload) {
    const { usersEventsHOLId, usersHOLId } = payload;
    const checkExistingInvolve = await this._holUsersInvolvementsRepository.readByUsersEventsId({ usersEventsHOLId });
    if (checkExistingInvolve) {
      throw new Error('Involvements sudah terdaftar');
    }

    const userInvolve = await this._holUsersInvolvementsRepository.create({
      usersEventsHOLId,
      usersHOLId,
    });
    return userInvolve;
  }
}
module.exports = HOLCreateUsersInvolvementsUseCase;
