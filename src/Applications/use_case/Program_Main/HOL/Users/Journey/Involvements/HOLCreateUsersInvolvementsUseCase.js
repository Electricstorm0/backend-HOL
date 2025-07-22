const InvariantError = require('../../../../../../../Commons/exceptions/InvariantError');

class HOLCreateUsersInvolvementsUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute(payload) {
    const { usersEventsHOLId, usersId } = payload;
    const checkExistingInvolve = await this._holUsersInvolvementsRepository.readByUsersEventsId({ usersEventsHOLId });
    if (checkExistingInvolve) {
      throw new InvariantError('Involvements has registered');
    }

    await this._holUsersInvolvementsRepository.create({
      usersEventsHOLId,
      usersId,
    });
  }
}
module.exports = HOLCreateUsersInvolvementsUseCase;
