/* eslint-disable camelcase */
class GetMasterProgramSecondTier {
  constructor(payload) {
    const { name } = payload;

    this.secondTierProgramName = name;
  }
}

module.exports = GetMasterProgramSecondTier;
