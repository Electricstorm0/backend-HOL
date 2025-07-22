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
      ability,
      description_ability,
      bcf_activities,
      other_activities,
      five_year_award,
      five_year_plan,
      five_year_plan_description,
      id_card_selfie,
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
    // MOVE TO UNIVERSITIES gradePointAverage
    // this.gradePointAverage = grade_point_average;
    // this.birthDate = birth_date;
    this.domicile = domicile;
    // this.emergencyPhoneNumber = emergency_phone_number;
    // this.emergencyPhoneNumberRelationship = relationship_emergency_phone_number;
    this.universities = universities;
    // MOVE TO UNIVERSITIES
    // this.universitiesName = universitiesName;
    // this.universitiesType = universitiesType;
    // this.universitiesProvinces = universitiesProvinces;
    // this.universitiesRegencies = universitiesRegencies;
    // this.universitiesMajor = universitiesMajor;
    // this.educationLevel = educational_level;
    // this.collageYear = collage_year;
    // MOVE TO UNIVERSITIES
    // this.semester = semester;
    this.institutions = institutions;
    // this.institutionsName = institutionsName;
    // this.institutionsLocation = institutionsLocation;
    // this.institutionsDivision = institutionsDivision;
    // this.institutionsClusterFocus = institutionsClusterFocus;
    this.secondTierProgramName = secondTierProgramName;
    this.musicalInstrument = musical_instrument;
    this.ability = ability;
    this.abilityDescription = description_ability;
    this.activitiesBCF = bcf_activities;
    this.activitiesOthers = other_activities;
    this.fiveYearAward = five_year_award;
    this.fiveYearPlan = five_year_plan;
    this.fiveYearPlanDescription = five_year_plan_description;
    this.cardSelfieId = id_card_selfie;
    this.regenciesUsersLocation = regenciesUsersLocation;
  }
}

module.exports = HOLGetUsersMeDetail;
