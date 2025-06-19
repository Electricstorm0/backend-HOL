/* eslint-disable camelcase */
class GetUsersMeBCF {
  constructor(payload) {
    const { first_name, last_name } = payload;

    this.firstName = first_name;
    this.lastName = last_name;
  }
}

module.exports = GetUsersMeBCF;
