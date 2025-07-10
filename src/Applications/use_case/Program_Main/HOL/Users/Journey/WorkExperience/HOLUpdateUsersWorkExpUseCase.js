const updateExp = require('../../../../../../../Domains/program_main/hol/temp-Users/journey/work_experience/entities/UpdateWorkExperience');

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
