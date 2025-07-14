const updateInvlove = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/entities/UpdateInvolvements');

class HOLUpdateUsersInvolvementsUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute({ id }, payload) {
    const updatedInvolve = new updateInvlove(payload);
    await this._holUsersInvolvementsRepository.update({ id, payload: updatedInvolve });
  }
}
module.exports = HOLUpdateUsersInvolvementsUseCase;
