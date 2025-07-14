class HOLCreateUsersUseCase {
  constructor({ holUsersRepository }) {
    this._holUsersRepository = holUsersRepository;
  }

  async execute(payload) {
    const {
      usersId,
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

    const usersHolId = await this._holUsersRepository.create({
      usersId,
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
    return usersHolId;
  }
}
module.exports = HOLCreateUsersUseCase;
