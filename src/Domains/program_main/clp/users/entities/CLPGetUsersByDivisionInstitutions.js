/* eslint-disable camelcase */
class CLPGetUsersByDivisionInstitutions {
  constructor(payload) {
    const {
      id, first_name, last_name, phone_number,
    } = payload;

    this.usersId = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.numberPhone = phone_number;
  }
}

module.exports = CLPGetUsersByDivisionInstitutions;
