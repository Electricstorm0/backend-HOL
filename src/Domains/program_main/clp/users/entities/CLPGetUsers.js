/* eslint-disable camelcase */
class CLPGetUsers {
  constructor(payload) {
    const {
      id, first_name, last_name, universities, institutions, mentors, program, progressPAT,
    } = payload;

    this.CLPUsersId = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.universities = universities;
    this.institutions = institutions;
    this.mentors = mentors;
    this.program = program;
    this.progressPAT = progressPAT;
  }
}

module.exports = CLPGetUsers;
