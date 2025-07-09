class getUsersRecommendation {
  constructor(payload) {
    const { Nama_Alumni, Program, batch, Tahun, deadline, status } = payload;
    this.Nama_Alumni = Nama_Alumni;
    this.Program = Program;
    this.Batch = batch;
    this.Tahun = Tahun;
    this.Deadline = deadline;
    this.Status = status;
  }
}
module.exports = getUsersRecommendation;
