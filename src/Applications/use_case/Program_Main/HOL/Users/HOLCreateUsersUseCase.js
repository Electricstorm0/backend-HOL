const InvariantError = require('../../../../../Commons/exceptions/InvariantError');

class HOLCreateUsersUseCase {
  constructor({ holUsersRepository }) {
    this._holUsersRepository = holUsersRepository;
  }

  async execute(payload) {
    const {
      usersId,
      batchId,
      musicalInstrument,
      talent,
      taletDescriptionSelected,
      bcfActivities,
      otherActivities,
      fiveYearAward,
      fiveYearPlan,
      fiveYearPlanDescription,
      ability,
      abilityDescriptionSelected,
      abilityAwardSelected,
      achievementsLastThreeYears,
      activitiesOutside,
      haveABussiness,
      joinedSocialCommunities,
    } = payload;

    const isRegistered = await this._holUsersRepository.checkRegisteredUsersHOL({ usersId, batchId });
    if (isRegistered) {
      throw new InvariantError('user has registered');
    } else {
      const usersHolId = await this._holUsersRepository.create({
        usersId,
        batchId,
        musicalInstrument,
        talent,
        taletDescriptionSelected,
        bcfActivities,
        otherActivities,
        fiveYearAward,
        fiveYearPlan,
        fiveYearPlanDescription,
        ability,
        abilityDescriptionSelected,
        abilityAwardSelected,
        achievementsLastThreeYears,
        activitiesOutside,
        haveABussiness,
        joinedSocialCommunities,
      });
    }
  }
}
module.exports = HOLCreateUsersUseCase;
