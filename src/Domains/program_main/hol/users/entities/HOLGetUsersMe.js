/* eslint-disable camelcase */
class HOLGetUsersMe {
  constructor(payload) {
    const { currentlyProgram, first_name, last_name } = payload;

    this.firstName = first_name;
    this.lastName = last_name;
    this.currentlyProgram = currentlyProgram;
  }
}

module.exports = HOLGetUsersMe;
