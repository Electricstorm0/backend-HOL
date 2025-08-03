// const GetUsersInvolve = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/entities/GetInvolvements');

class HOLGetUsersInvolvementssByIdUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute({ id: usersHOLId }) {
    const involve = (await this._holUsersInvolvementsRepository.readById({ usersHOLId })) || [];
    return involve;
  }
}

module.exports = HOLGetUsersInvolvementssByIdUseCase;
