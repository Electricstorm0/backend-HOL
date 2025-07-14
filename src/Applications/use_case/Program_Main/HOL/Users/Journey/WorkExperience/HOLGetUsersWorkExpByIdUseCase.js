const GetExp = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/GetWorkExperience');

class HOLGetUsersWorkExpByIdUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute({ id }) {
    const exp = (await this._holUsersWorkExpRepository.readById({ id })) || {};
    const result = new GetExp({ ...exp });
    return result;
  }
}

module.exports = HOLGetUsersWorkExpByIdUseCase;
