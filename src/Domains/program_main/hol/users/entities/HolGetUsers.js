/* eslint-disable camelcase */
class HolGetUsers {
  constructor(payload) {
    const {
      id,
      id_users,
      photoProfile,
      Alumni_Name,
      program,
      batch,
      domisili,
      recent_journey,
      musical_instrument,
      talent,
      talent_description_selected,
      bcf_activites,
      other_activites,
      five_year_award,
      five_year_plan,
      five_year_plan_description,
      ability,
      ability_description_selected,
      ability_award_selected,
      achievement_last_three_years,
      activities_outside_college_and_internship,
      have_a_business,
      joined_social_communities,
    } = payload;
    this.usersHOLId = id;
    this.usersId = id_users;
    this.photoProfile = photoProfile;
    this.alumniName = Alumni_Name;
    this.program = program;
    this.batch = batch;
    this.domicile = domisili;
    this.recent_journey = recent_journey;
    this.musicalInstrument = musical_instrument;
    this.talent = talent;
    this.taletDescriptionSelected = talent_description_selected;
    this.bcfActivities = bcf_activites;
    this.otherActivities = other_activites;
    this.fiveYearAward = five_year_award;
    this.fiveYearPlan = five_year_plan;
    this.fiveYearPlanDescription = five_year_plan_description;
    this.ability = ability;
    this.abilityDescriptionSelected = ability_description_selected;
    this.abilityAwardSelected = ability_award_selected;
    this.achievementsLastThreeYears = achievement_last_three_years;
    this.activitiesOutside = activities_outside_college_and_internship;
    this.haveABussiness = have_a_business;
    this.joinedSocialCommunities = joined_social_communities;
  }
  // _verifyPayload({
  //   id_users,
  //   musical_instrument,
  //   talent,
  //   talent_description_selected,
  //   bcf_activites,
  //   other_activites,
  //   five_year_award,
  //   five_year_plan,
  //   five_year_plan_description,
  //   ability,
  //   ability_description_selected,
  //   ability_award_selected,
  //   achievement_last_three_years,
  //   activities_outside_college_and_internship,
  //   have_a_business,
  //   joined_social_communities,
  // }) {
  //   if (
  //     !id_users ||
  //     !musical_instrument ||
  //     !talent ||
  //     !talent_description_selected ||
  //     !bcf_activites ||
  //     !other_activites ||
  //     !five_year_award ||
  //     !five_year_plan ||
  //     !five_year_plan_description ||
  //     !ability ||
  //     !ability_description_selected ||
  //     !ability_award_selected ||
  //     !achievement_last_three_years ||
  //     !activities_outside_college_and_internship ||
  //     !have_a_business ||
  //     !joined_social_communities
  //   ) {
  //     throw new Error('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
  //   }
  //   if (
  //     typeof id_users !== 'number' ||
  //     typeof musical_instrument !== 'string' ||
  //     typeof talent !== 'string' ||
  //     typeof talent_description_selected !== 'string' ||
  //     typeof bcf_activites !== 'string' ||
  //     typeof other_activites !== 'string' ||
  //     typeof five_year_award !== 'string' ||
  //     typeof five_year_plan !== 'string' ||
  //     typeof five_year_plan_description !== 'string' ||
  //     typeof ability !== 'string' ||
  //     typeof ability_description_selected !== 'string' ||
  //     typeof ability_award_selected !== 'string' ||
  //     typeof achievement_last_three_years !== 'string' ||
  //     typeof activities_outside_college_and_internship !== 'string' ||
  //     typeof have_a_business !== 'number' ||
  //     typeof joined_social_communities !== 'string'
  //   ) {
  //     throw new Error('GET_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  //   }
  // }
}
module.exports = HolGetUsers;
