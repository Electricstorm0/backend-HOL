/* eslint-disable camelcase */
class CLPGetMentors {
  constructor(payload) {
    const {
      id, mentorsId, first_name, last_name, position, skill,
    } = payload;

    this.usersId = id;
    this.mentorsId = mentorsId;
    this.firstName = first_name;
    this.lastName = last_name;
    this.position = position;
    this.skill = skill;
  }
}

module.exports = CLPGetMentors;
