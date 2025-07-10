const updateInvlove = require('../../../../../../../Domains/program_main/hol/temp-Users/journey/involvements/entities/UpdateInvolvements');

class HOLUpdateUsersInvolvementsUseCase {
  constructor({ HOLUsersInvolvementsRepository }) {
    this._HOLUsersInvolvementsRepository = HOLUsersInvolvementsRepository;
  }

  async execute({ id }, payload) {
    const updatedInvolve = new updateInvlove(payload);
    await this._HOLUsersInvolvementsRepository.update({ id, payload: updatedInvolve });
  }
}
module.exports = HOLUpdateUsersInvolvementsUseCase;
