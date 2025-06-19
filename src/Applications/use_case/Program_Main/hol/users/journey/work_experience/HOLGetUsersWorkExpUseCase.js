const GetExp = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/getWorkExp');

class HOLGetUsersWorkExpUseCase {
  constructor({ HOLUsersWorkExpRepository }) {
    this._HOLUsersWorkExpRepository = HOLUsersWorkExpRepository;
  }

  async execute() {
    try {
      const Exp = await this._HOLUsersWorkExpRepository.read(); // misal typeId: 1 untuk CFF
      const result = await Promise.all(
        Exp.map(async (value) => ({
          ...new GetExp({
            ...value,
          }),
        }))
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetUsersWorkExpUseCase;
