/* eslint-disable camelcase */
class GetMasterRegencies {
  constructor(payload) {
    const { id, name } = payload;

    this.regenciesId = id;
    this.regenciesName = name;
  }
}

module.exports = GetMasterRegencies;
