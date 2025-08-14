/* eslint-disable camelcase */
class HOLGetUsersMeDetail {
  constructor(payload) {
    const {
      id_users,
      id_batch,
      batch,
      batchYear,
      photoProfile,
      id_card_number,
      // nim,
      first_name,
      last_name,
      // sex,
      email,
      phone_number,
      // grade_point_average,
      // birth_date,
      domicile,
      // emergency_phone_number,
      // relationship_emergency_phone_number,
      universities,
      // semester,
      institutions,
      secondTierProgramName,
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
      regenciesUsersLocation,
    } = payload;

    this.usersId = id_users;
    this.batchId = id_batch;
    this.numberCardId = id_card_number;
    // MOVE TO UNIVERSITIES nim
    // this.nim = nim;
    this.firstName = first_name;
    this.lastName = last_name;
    this.batch = batch;
    this.year = batchYear;
    // this.sex = sex;
    this.email = email;
    this.photoProfile = photoProfile;
    this.numberPhone = phone_number;

    this.domicile = domicile;

    this.universities = universities;

    this.institutions = institutions;

    this.secondTierProgramName = secondTierProgramName;
    this.musicalInstrument = musical_instrument;
    this.talent = talent;
    this.talentDescription = talent_description_selected;
    this.otherActivities = other_activites;
    this.ability = ability;
    this.abilityDescription = ability_description_selected;
    this.abilityAward = ability_award_selected;
    this.achievementsLastThreeYears = achievement_last_three_years;
    this.outsideCollageAndInternActivity = activities_outside_college_and_internship;
    this.haveBusiness = have_a_business;
    this.joinSocialCommunity = joined_social_communities;
    this.activitiesBCF = bcf_activites;
    this.activitiesOthers = other_activites;
    this.fiveYearAward = five_year_award;
    this.fiveYearPlan = five_year_plan;
    this.fiveYearPlanDescription = five_year_plan_description;
    // this.cardSelfieId = id_card_selfie;
    this.regenciesUsersLocation = regenciesUsersLocation;
  }
}

module.exports = HOLGetUsersMeDetail;
