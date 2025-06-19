/* eslint-disable camelcase */
class CLPGetDetailEvaluationsFinal {
  constructor(payload) {
    const {
      id, first_name, last_name, total, average, note, certificate_url,
    } = payload;

    this.mentessId = id;
    this.mentessFirstName = first_name;
    this.mentessLastName = last_name;
    this.finalEvaluationNote = note;
    this.finalEvaluationUrlCertificate = certificate_url;
    this.finalEvaluationTotal = total;
    this.finalEvaluationAverage = average;
  }
}

module.exports = CLPGetDetailEvaluationsFinal;
