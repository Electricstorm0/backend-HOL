/* eslint-disable camelcase */
class CLPGetUsersMeDetail {
  constructor(payload) {
    const {
      CLPUsersId, id_keg, id_card_number, nim, first_name, last_name, sex, email, phone_number, grade_point_average, birth_date,
      domicile, bank_account_number, bank_account_name, bank_name,
      emergency_phone_number, relationship_emergency_phone_number, universities,
      semester, institutions, thirdTierProgramName, thirdTierProgramDescription,
      mob_keb_pengajuan_keberangkatan, mob_keb_provinsi_keberangkatan, mob_keb_moda_keberangkatan, mob_keb_provinsi_asal_keberangkatan, mob_keb_bandara_stasiun_keberangkatan,
      mob_keb_prov_bandara_stasiun_keberangkatan, mob_keb_bandara_stasiun_tujuan, mob_keb_prov_bandara_stasiun_tujuan, mob_kep_pengajuan_kepulangan,
      mob_kep_provinsi_kepulangan, mob_kep_moda_kepulangan, mob_kep_provinsi_asal_keberangkatan, mob_kep_bandara_stasiun_kepulangan, mob_kep_prov_bandara_stasiun_kepulangan,
      mob_kep_bandara_stasiun_tujuan, mob_kep_prov_bandara_stasiun_tujuan, mob_url_surat_keterangan,
      musical_instrument, ability, description_ability, bcf_activities, other_activities,
      five_year_award, five_year_plan, five_year_plan_description, id_card_selfie,
      socmed_instagram, socmed_tiktok, socmed_linkedin, regenciesUsersLocation,
    } = payload;

    this.usersCLPId = CLPUsersId;
    this.kegId = id_keg;
    this.numberCardId = id_card_number;
    // MOVE TO UNIVERSITIES nim
    this.nim = nim;
    this.firstName = first_name;
    this.lastName = last_name;
    this.sex = sex;
    this.email = email;
    this.numberPhone = phone_number;
    // MOVE TO UNIVERSITIES gradePointAverage
    this.gradePointAverage = grade_point_average;
    this.birthDate = birth_date;
    this.domicile = domicile;
    this.bankAccountNumber = bank_account_number;
    this.bankAccountName = bank_account_name;
    this.bankName = bank_name;
    this.emergencyPhoneNumber = emergency_phone_number;
    this.emergencyPhoneNumberRelationship = relationship_emergency_phone_number;
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
    this.semester = semester;
    this.institutions = institutions;
    // this.institutionsName = institutionsName;
    // this.institutionsLocation = institutionsLocation;
    // this.institutionsDivision = institutionsDivision;
    // this.institutionsClusterFocus = institutionsClusterFocus;
    this.thirdTierProgramName = thirdTierProgramName;
    this.thirdTierProgramDescription = thirdTierProgramDescription;
    this.mob_keb_pengajuan_keberangkatan = mob_keb_pengajuan_keberangkatan;
    this.mob_keb_provinsi_keberangkatan = mob_keb_provinsi_keberangkatan;
    this.mob_keb_moda_keberangkatan = mob_keb_moda_keberangkatan;
    this.mob_keb_provinsi_asal_keberangkatan = mob_keb_provinsi_asal_keberangkatan;
    this.mob_keb_bandara_stasiun_keberangkatan = mob_keb_bandara_stasiun_keberangkatan;
    this.mob_keb_prov_bandara_stasiun_keberangkatan = mob_keb_prov_bandara_stasiun_keberangkatan;
    this.mob_keb_bandara_stasiun_tujuan = mob_keb_bandara_stasiun_tujuan;
    this.mob_keb_prov_bandara_stasiun_tujuan = mob_keb_prov_bandara_stasiun_tujuan;
    this.mob_kep_pengajuan_kepulangan = mob_kep_pengajuan_kepulangan;
    this.mob_kep_provinsi_kepulangan = mob_kep_provinsi_kepulangan;
    this.mob_kep_moda_kepulangan = mob_kep_moda_kepulangan;
    this.mob_kep_provinsi_asal_keberangkatan = mob_kep_provinsi_asal_keberangkatan;
    this.mob_kep_bandara_stasiun_kepulangan = mob_kep_bandara_stasiun_kepulangan;
    this.mob_kep_prov_bandara_stasiun_kepulangan = mob_kep_prov_bandara_stasiun_kepulangan;
    this.mob_kep_bandara_stasiun_tujuan = mob_kep_bandara_stasiun_tujuan;
    this.mob_kep_prov_bandara_stasiun_tujuan = mob_kep_prov_bandara_stasiun_tujuan;
    this.mob_url_surat_keterangan = mob_url_surat_keterangan;
    this.musicalInstrument = musical_instrument;
    this.ability = ability;
    this.abilityDescription = description_ability;
    this.activitiesBCF = bcf_activities;
    this.activitiesOthers = other_activities;
    this.fiveYearAward = five_year_award;
    this.fiveYearPlan = five_year_plan;
    this.fiveYearPlanDescription = five_year_plan_description;
    this.socmedInstagram = socmed_instagram;
    this.socmedTiktok = socmed_tiktok;
    this.socmedLinkedIn = socmed_linkedin;
    this.cardSelfieId = id_card_selfie;
    this.regenciesUsersLocation = regenciesUsersLocation;
  }
}

module.exports = CLPGetUsersMeDetail;
