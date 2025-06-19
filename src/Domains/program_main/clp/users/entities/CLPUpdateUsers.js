/* eslint-disable camelcase */
class CLPUpdateUsers {
  constructor(payload) {
    const {
      mob_keb_pengajuan_keberangkatan, mob_keb_provinsi_keberangkatan, mob_keb_moda_keberangkatan, mob_keb_provinsi_asal_keberangkatan, mob_keb_bandara_stasiun_keberangkatan,
      mob_keb_prov_bandara_stasiun_keberangkatan, mob_keb_bandara_stasiun_tujuan, mob_keb_prov_bandara_stasiun_tujuan, mob_kep_pengajuan_kepulangan,
      mob_kep_provinsi_kepulangan, mob_kep_moda_kepulangan, mob_kep_provinsi_asal_keberangkatan, mob_kep_bandara_stasiun_kepulangan, mob_kep_prov_bandara_stasiun_kepulangan,
      mob_kep_bandara_stasiun_tujuan, mob_kep_prov_bandara_stasiun_tujuan, mob_url_surat_keterangan,
      musical_instrument, ability, description_ability, bcf_activities, other_activities, five_year_award,
      five_year_plan, five_year_plan_description, id_card_selfie, regenciesUsersLocationId,
    } = payload;

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
    this.musical_instrument = musical_instrument;
    this.ability = ability;
    this.description_ability = description_ability;
    this.bcf_activities = bcf_activities;
    this.other_activities = other_activities;
    this.five_year_award = five_year_award;
    this.five_year_plan = five_year_plan;
    this.five_year_plan_description = five_year_plan_description;
    this.id_card_selfie = id_card_selfie;
    this.id_regencies = regenciesUsersLocationId;
  }
}

module.exports = CLPUpdateUsers;
