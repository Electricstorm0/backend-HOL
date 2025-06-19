/* eslint-disable camelcase */
class HOLGetUsersUniversities {
  constructor(payload) {
    const { id, nim, grade_point_average, collage_year, educational_level, universitiesDetail } = payload;

    this.usersUniverisitiesId = id;
    this.nim = nim;
    this.gradePointAverage = grade_point_average;
    this.collageYear = collage_year;
    this.educationLevel = educational_level;
    this.universitiesDetail = universitiesDetail;
  }
}

module.exports = HOLGetUsersUniversities;
