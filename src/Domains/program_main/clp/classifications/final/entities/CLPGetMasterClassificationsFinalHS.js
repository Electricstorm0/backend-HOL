/* eslint-disable camelcase */
class CLPGetMasterClassificationsFinalHS {
  constructor(payload) {
    const { classification } = payload;

    this.classification = classification;
  }
}

module.exports = CLPGetMasterClassificationsFinalHS;
