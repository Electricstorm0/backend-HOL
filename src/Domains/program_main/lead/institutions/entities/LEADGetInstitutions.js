/* eslint-disable camelcase */
class LEADGetInstitutions {
  constructor(payload) {
    const {
      id, name, location, id_provincies,
    } = payload;

    this.institutionsId = id;
    this.institutionsName = name;
    this.institutionsLocation = location;
    this.institutionsPronvinciesId = id_provincies;
  }
}

module.exports = LEADGetInstitutions;
