/* eslint-disable camelcase */
class CLPUpdateUsersDetail {
  constructor(payload) {
    const {
      usersCLPId, numberCardId, nim, firstName, lastName, sex, email, numberPhone, birthDate,
      domicile, bankAccountNumber, bankAccountName, bankName,
      emergencyPhoneNumber, emergencyPhoneNumberRelationship, universities,
      mob_keb_pengajuan_keberangkatan, mob_keb_provinsi_keberangkatan, mob_keb_moda_keberangkatan, mob_keb_provinsi_asal_keberangkatan, mob_keb_bandara_stasiun_keberangkatan,
      mob_keb_prov_bandara_stasiun_keberangkatan, mob_keb_bandara_stasiun_tujuan, mob_keb_prov_bandara_stasiun_tujuan, mob_kep_pengajuan_kepulangan,
      mob_kep_provinsi_kepulangan, mob_kep_moda_kepulangan, mob_kep_provinsi_asal_keberangkatan, mob_kep_bandara_stasiun_kepulangan, mob_kep_prov_bandara_stasiun_kepulangan,
      mob_kep_bandara_stasiun_tujuan, mob_kep_prov_bandara_stasiun_tujuan, mob_url_surat_keterangan,
      musicalInstrument, ability, abilityDescription, activitiesBCF, activitiesOthers,
      fiveYearAward, fiveYearPlan, fiveYearPlanDescription,
      socmedInstagram, socmedTiktok, socmedLinkedIn,
      cardSelfieId, regenciesUsersLocationId,
    } = payload;

    this.id_users_clp = usersCLPId;
    this.id_card_number = numberCardId;
    this.nim = nim;
    this.first_name = firstName;
    this.last_name = lastName;
    this.sex = sex;
    this.email = email;
    this.phone_number = numberPhone;
    this.birth_date = birthDate;
    this.domicile = domicile;
    this.bank_account_number = bankAccountNumber;
    this.bank_account_name = bankAccountName;
    this.bank_name = bankName;
    this.emergency_phone_number = emergencyPhoneNumber;
    this.relationship_emergency_phone_number = emergencyPhoneNumberRelationship;
    this.universities = universities;
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
    this.musical_instrument = musicalInstrument;
    this.ability = ability;
    this.description_ability = abilityDescription;
    this.bcf_activities = activitiesBCF;
    this.other_activities = activitiesOthers;
    this.five_year_award = fiveYearAward;
    this.five_year_plan = fiveYearPlan;
    this.five_year_plan_description = fiveYearPlanDescription;
    this.socmed_instagram = socmedInstagram;
    this.socmed_tiktok = socmedTiktok;
    this.socmed_linkedin = socmedLinkedIn;
    this.id_card_selfie = cardSelfieId;
    this.regenciesUsersLocationId = regenciesUsersLocationId;
  }
}

module.exports = CLPUpdateUsersDetail;
