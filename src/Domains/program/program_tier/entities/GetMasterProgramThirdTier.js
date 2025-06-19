/* eslint-disable camelcase */
class GetMasterProgramThirdTier {
  constructor(payload) {
    const { name, descriptions } = payload;

    this.thirdTierProgramName = name;
    this.thirdTierProgramDescription = descriptions;
  }
}

module.exports = GetMasterProgramThirdTier;
