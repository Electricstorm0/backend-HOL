/* eslint-disable camelcase */
class GetMasterUniversitiesMajor {
  constructor(payload) {
    const {
      name,
    } = payload;

    this.universitiesMajor = name;
  }
}

module.exports = GetMasterUniversitiesMajor;
