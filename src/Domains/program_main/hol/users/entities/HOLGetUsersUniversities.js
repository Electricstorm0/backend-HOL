/* eslint-disable camelcase */
class HOLGetUsersUniversities {
  constructor(payload) {
    const { id, collage_year, universitiesDetail } = payload;

    this.usersUniverisitiesId = id;
    this.collageYear = collage_year;
    this.universitiesDetail = universitiesDetail;
  }
}

module.exports = HOLGetUsersUniversities;
