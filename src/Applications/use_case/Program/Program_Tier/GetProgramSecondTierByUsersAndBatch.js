const GetMasterProgramSecondTier = require('../../../../Domains/program/program_tier/entities/GetMasterProgramSecondTier');

class GetProgramSecondTierByUsersAndBatch {
  constructor({ offeredProgramRepository, masterProgramThirdTierRepository }) {
    this._offeredProgramRepository = offeredProgramRepository;
    this._masterProgramThirdTierRepository = masterProgramThirdTierRepository;
  }

  async execute({ batchId, usersId }) {
    const { id_third_tier_program: thirdTierProgramId } = await this._offeredProgramRepository.readyByBatchAndUsersId({ batchId, usersId });
    const secondTierProgram = new GetMasterProgramSecondTier(await this._masterProgramThirdTierRepository.readSecProgramNameByThirdProgramId({ id: thirdTierProgramId }));
    return secondTierProgram;
  }
}

module.exports = GetProgramSecondTierByUsersAndBatch;
