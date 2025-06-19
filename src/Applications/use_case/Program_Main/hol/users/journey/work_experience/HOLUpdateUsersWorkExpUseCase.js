const updateExp = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/updateWorkExp');

class HOLUpdateUsersWorkExpUseCase {
  constructor({ HOLUsersWorkExpRepository }) {
    this._HOLUsersWorkExpRepository = HOLUsersWorkExpRepository;
  }

  async execute({ id }, payload) {
    const updatedExp = new updateExp(payload);
    await this._HOLUsersWorkExpRepository.update({ id, payload: updatedExp });
  }
}
module.exports = HOLUpdateUsersWorkExpUseCase;
