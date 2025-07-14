const updateExp = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/UpdateWorkExperience');

class HOLUpdateUsersWorkExpUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute({ id }, payload) {
    const updatedExp = new updateExp(payload);
    await this._holUsersWorkExpRepository.update({ id, payload: updatedExp });
  }
}
module.exports = HOLUpdateUsersWorkExpUseCase;
