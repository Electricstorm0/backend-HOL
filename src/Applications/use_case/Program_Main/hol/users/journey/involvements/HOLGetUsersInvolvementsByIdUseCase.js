const NotFoundError = require('../../../../../../../Commons/exceptions/NotFoundError');
const GetUsersInvolve = require('../../../../../../../Domains/program_main/hol/Users/Journey/Involvements/entities/GetInvolvements');

class HOLGetUsersInvolvementssByIdUseCase {
  constructor({ HOLUsersInvolvementsRepository }) {
    this._HOLUsersInvolvementsRepository = HOLUsersInvolvementsRepository;
  }

  async execute({ id }) {
    const involve = await this._HOLUsersInvolvementsRepository.readById({ id }); // misal typeId: 1 untuk CFF
    if (!involve || involve.length === 0) {
      throw new NotFoundError(`Data tidak ditemukan`);
    }
    const result = new GetUsersInvolve({ ...involve });

    return result;
  }
}

module.exports = HOLGetUsersInvolvementssByIdUseCase;
