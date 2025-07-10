const GetExp = require('../../../../../../../Domains/program_main/hol/temp-Users/journey/work_experience/entities/GetWorkExperience');

class HOLGetUsersWorkExpUseCase {
  constructor({ HOLUsersWorkExpRepository }) {
    this._HOLUsersWorkExpRepository = HOLUsersWorkExpRepository;
  }

  async execute() {
    const Exp = await this._HOLUsersWorkExpRepository.read(); // misal typeId: 1 untuk CFF
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
