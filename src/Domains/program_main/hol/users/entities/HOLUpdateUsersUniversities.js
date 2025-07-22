class HOLUpdateUsersUniversities {
  constructor(payload) {
    const { usersUniversitiesId, universitiesMajorId, collageYear } = payload;
    this.id = usersUniversitiesId;
    this.id_major_universities = universitiesMajorId;
    this.collage_year = collageYear;
  }
}
module.exports = HOLUpdateUsersUniversities;
