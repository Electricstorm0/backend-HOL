const updateInvlove = require('../../../../../../../Domains/program_main/hol/Users/Journey/Involvements/entities/UpdateInvolvements');

class HOLUpdateUsersInvolvementsUseCase {
  constructor({ HOLUsersInvolvementsRepository }) {
    this._HOLUsersInvolvementsRepository = HOLUsersInvolvementsRepository;
  }

  async execute({ id }, payload) {
    try {
      const updatedInvolve = new updateInvlove(payload);
      await this._HOLUsersInvolvementsRepository.update({ id, payload: updatedInvolve });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = HOLUpdateUsersInvolvementsUseCase;
