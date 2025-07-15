class getRecommendation {
  constructor(payload) {
    const { id, id_hol_users_recommendations, institutions, pusposes, deadline, details, created_at, status } = payload;
    this.recommendationId = id;
    this.usersRecommendationId = id_hol_users_recommendations;
    this.institutions = institutions;
    this.purposes = pusposes;
    this.deadline = deadline;
    this.detail = details;
    this.tanggal_pengajuan = created_at;
    this.status = status;
  }
}
module.exports = getRecommendation;
