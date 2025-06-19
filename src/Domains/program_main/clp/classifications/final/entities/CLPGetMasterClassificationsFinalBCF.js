/* eslint-disable camelcase */
class CLPGetMasterClassificationsFinalBCF {
  constructor(payload) {
    const { classification } = payload;

    this.classification = classification;
  }
}

module.exports = CLPGetMasterClassificationsFinalBCF;
