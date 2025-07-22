/* eslint-disable camelcase */
class HolUpdateUsers {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      usersHOLId,
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
    this.id = usersHOLId;
    this.musical_instrument = musicalInstrument;
    this.talent = talent;
    this.talent_description_selected = taletDescriptionSelected;
    this.bcf_activites = bcfActivities;
    this.other_activites = otherActivities;
    this.five_year_award = fiveYearAward;
    this.five_year_plan = fiveYearPlan;
    this.five_year_plan_description = fiveYearPlanDescription;
    this.ability = ability;
    this.ability_description_selected = abilityDescriptionSelected;
    this.ability_award_selected = abilityAwardSelected;
    this.achievement_last_three_years = achievementsLastThreeYears;
    this.activities_outside_college_and_internship = activitiesOutside;
    this.have_a_business = haveABussiness;
    this.joined_social_communities = joinedSocialCommunities;
  }
  _verifyPayload({
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
  }) {
    if (
      !musicalInstrument ||
      !talent ||
      !taletDescriptionSelected ||
      !bcfActivities ||
      !otherActivities ||
      !fiveYearAward ||
      !fiveYearPlan ||
      !fiveYearPlanDescription ||
      !ability ||
      !abilityDescriptionSelected ||
      !abilityAwardSelected ||
      !achievementsLastThreeYears ||
      !activitiesOutside ||
      !haveABussiness ||
      !joinedSocialCommunities
    ) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = HolUpdateUsers;
