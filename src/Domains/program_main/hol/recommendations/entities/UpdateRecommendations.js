class updateRecommendations {
  constructor(payload) {
    const { recommendationStatusId, note } = payload;
    this.id_recommendations_status = recommendationStatusId;
    this.note = note;
  }
}
module.exports = updateRecommendations;
