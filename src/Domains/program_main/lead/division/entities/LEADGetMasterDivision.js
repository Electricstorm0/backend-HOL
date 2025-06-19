/* eslint-disable camelcase */
class LEADGetMasterDivision {
  constructor(payload) {
    const { id, name } = payload;

    this.institutionsDivisionId = id;
    this.institutionsDivision = name;
  }
}

module.exports = LEADGetMasterDivision;
