/* eslint-disable camelcase */
class GetMasterUniversities {
  constructor(payload) {
    const {
      id, name, type,
    } = payload;

    this.universitiesId = id;
    this.universitiesName = name;
    this.universitiesType = type;
  }
}

module.exports = GetMasterUniversities;
