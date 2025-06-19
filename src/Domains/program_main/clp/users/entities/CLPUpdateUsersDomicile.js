/* eslint-disable camelcase */
class CLPUpdateUsersDomicile {
  constructor(payload) {
    const {
      usersDomicileId, completeAddress, provinceId, regenciesId,
    } = payload;

    this.id = usersDomicileId;
    this.complete_address = completeAddress;
    this.id_regencies = regenciesId;
    this.id_provincies = provinceId;
  }
}

module.exports = CLPUpdateUsersDomicile;
