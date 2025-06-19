/* eslint-disable camelcase */
class CLPGetMasterClassificationsPAT {
  constructor(payload) {
    const { id, classification } = payload;

    this.classificationId = id;
    this.classification = classification;
  }
}

module.exports = CLPGetMasterClassificationsPAT;
