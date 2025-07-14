const GetUsersInvolve = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/entities/GetInvolvements');

class HOLGetUsersInvolvementssByIdUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute({ id }) {
    const involve = (await this._holUsersInvolvementsRepository.readById({ id })) || {};
    const result = new GetUsersInvolve({ ...involve });

    return result;
  }
}

module.exports = HOLGetUsersInvolvementssByIdUseCase;
