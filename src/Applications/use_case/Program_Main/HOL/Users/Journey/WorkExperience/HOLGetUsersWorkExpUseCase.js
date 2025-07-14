const GetExp = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/GetWorkExperience');

class HOLGetUsersWorkExpUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute() {
    const Exp = (await this._holUsersWorkExpRepository.read()) || [];
    const result = await Promise.all(
      Exp.map(async (value) => ({
        ...new GetExp({
          ...value,
        }),
      }))
    );
    return result;
  }
}

module.exports = HOLGetUsersWorkExpUseCase;
