/* eslint-disable camelcase */
class UpdateMasterUniversities {
  constructor(payload) {
    const {
      universitiesProvincesId, universitiesRegenciesId,
    } = payload;

    this.id_province = universitiesProvincesId;
    this.id_regencie = universitiesRegenciesId;
  }
}

module.exports = UpdateMasterUniversities;
