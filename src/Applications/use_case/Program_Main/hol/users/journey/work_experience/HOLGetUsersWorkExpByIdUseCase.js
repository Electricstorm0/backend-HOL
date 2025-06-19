const NotFoundError = require('../../../../../../../Commons/exceptions/NotFoundError');
const GetExp = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/getWorkExp');

class HOLGetUsersWorkExpByIdUseCase {
  constructor({ HOLUsersWorkExpRepository }) {
    this._HOLUsersWorkExpRepository = HOLUsersWorkExpRepository;
  }

  async execute({ id }) {
    const exp = await this._HOLUsersWorkExpRepository.readById({ id }); // misal typeId: 1 untuk CFF
    if (!exp || exp.length === 0) {
      throw new NotFoundError(`Data tidak ditemukan`);
    }
    const result = new GetExp({ ...exp });

    return result;
  }
}

module.exports = HOLGetUsersWorkExpByIdUseCase;
