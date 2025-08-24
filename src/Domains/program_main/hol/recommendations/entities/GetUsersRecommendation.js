class getUsersRecommendation {
  constructor(payload) {
    const { id, Alumni_Name, Program, Batch, Year, deadline, status } = payload;
    this.recommendationId = id;
    this.alumniName = Alumni_Name;
    this.program = Program;
    this.batch = Batch;
    this.year = Year;
    this.deadline = deadline;
    this.status = status;
  }
}
module.exports = getUsersRecommendation;
