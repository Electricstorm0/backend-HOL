/* eslint-disable camelcase */
class CLPUpdateUsersUniversities {
  constructor(payload) {
    const {
      usersUniverisitiesId, collageYear, educationLevel,
    } = payload;

    this.id = usersUniverisitiesId;
    this.collage_year = collageYear;
    this.educational_level = educationLevel;
  }
}

module.exports = CLPUpdateUsersUniversities;
