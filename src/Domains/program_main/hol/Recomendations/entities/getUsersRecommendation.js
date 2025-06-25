class getUsersRecommendation {
  constructor(payload) {
    const { Nama_Alumni, program, batch, Tahun, deadline, status } = payload;
    this.Nama_Alumni = Nama_Alumni;
    this.Program = program;
    this.Batch = batch;
    this.Tahun = Tahun;
    this.Deadline = deadline;
    this.Status = status;
  }
}
module.exports = getUsersRecommendation;
