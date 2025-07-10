class updateRecommendations {
  constructor(payload) {
    const { recommendationStatusId, isChecked, note } = payload;
    (this.id_recommendations_status = recommendationStatusId), (this.is_checked = isChecked);
    this.note = note;
  }
}
module.exports = updateRecommendations;
