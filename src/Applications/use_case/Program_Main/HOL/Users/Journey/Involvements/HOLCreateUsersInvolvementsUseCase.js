const InvariantError = require('../../../../../../../Commons/exceptions/InvariantError');

class HOLCreateUsersInvolvementsUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute(payload) {
    const { usersEventsHOLId, usersHOLId } = payload;
    const checkExistingInvolve = await this._holUsersInvolvementsRepository.readByUsersEventsId({ usersEventsHOLId });
    if (checkExistingInvolve) {
      throw new InvariantError('Involvements sudah terdaftar');
    }

    await this._holUsersInvolvementsRepository.create({
      usersEventsHOLId,
      usersHOLId,
    });
  }
}
module.exports = HOLCreateUsersInvolvementsUseCase;
