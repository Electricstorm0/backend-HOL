/* eslint-disable camelcase */
class CLPGetMentorsDetail {
  constructor(payload) {
    const { id, first_name, last_name } = payload;

    this.mentorsId = id;
    this.firstName = first_name;
    this.lastName = last_name;
  }
}

module.exports = CLPGetMentorsDetail;
