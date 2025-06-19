/* eslint-disable camelcase */
class GetUsersDomicile {
  constructor(payload) {
    const {
      id,
      status,
      complete_address,
    } = payload;

    this.usersDomicileId = id;
    this.statusAddress = status;
    this.completeAddress = complete_address;
  }
}

module.exports = GetUsersDomicile;
