class CLPGetEvaluationsFinalBCF {
  constructor(payload) {
    const { evaluation, note } = payload;

    this.evaluation = evaluation;
    this.note = note;
  }
}

module.exports = CLPGetEvaluationsFinalBCF;
