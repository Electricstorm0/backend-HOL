const GetUsersInvolve = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/entities/GetInvolvements');

class HOLGetUsersInvolvementsUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute() {
    const invlove = (await this._holUsersInvolvementsRepository.read()) || [];
    const result = await Promise.all(
      invlove.map(async (value) => ({
        ...new GetUsersInvolve({
          ...value,
        }),
      }))
    );
    return result;
  }
}

module.exports = HOLGetUsersInvolvementsUseCase;
