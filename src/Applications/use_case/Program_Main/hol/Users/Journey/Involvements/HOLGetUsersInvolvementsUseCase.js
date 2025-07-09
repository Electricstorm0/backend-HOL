const GetUsersInvolve = require('../../../../../../../Domains/program_main/hol/temp-Users/Journey/Involvements/entities/GetInvolvements');

class HOLGetUsersInvolvementsUseCase {
  constructor({ HOLUsersInvolvementsRepository }) {
    this._HOLUsersInvolvementsRepository = HOLUsersInvolvementsRepository;
  }

  async execute() {
    try {
      const invlove = await this._HOLUsersInvolvementsRepository.read(); // misal typeId: 1 untuk CFF
      const result = await Promise.all(
        invlove.map(async (value) => ({
          ...new GetUsersInvolve({
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

module.exports = HOLGetUsersInvolvementsUseCase;
