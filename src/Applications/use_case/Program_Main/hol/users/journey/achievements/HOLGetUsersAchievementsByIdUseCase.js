const NotFoundError = require('../../../../../../../Commons/exceptions/NotFoundError');
const GetUsersAchieve = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/entities/getAchieve');

class HOLGetUsersAchievementsByIdUseCase {
  constructor({ HOLUsersAchievementsRepository }) {
    this._HOLUsersAchievementsRepository = HOLUsersAchievementsRepository;
  }

  async execute({ id }) {
    const achieve = await this._HOLUsersAchievementsRepository.readById({ id }); // misal typeId: 1 untuk CFF
    if (!achieve || achieve.length === 0) {
      throw new NotFoundError(`Data tidak ditemukan`);
    }
    const result = new GetUsersAchieve({ ...achieve });

    return result;
  }
}

module.exports = HOLGetUsersAchievementsByIdUseCase;
