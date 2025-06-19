const GetMasterProgramThirdTier = require('../../../../Domains/program/program_tier/entities/GetMasterProgramThirdTier');

class GetProgramThirdTierByUsersAndBatch {
  constructor({ offeredProgramRepository, masterProgramThirdTierRepository }) {
    this._offeredProgramRepository = offeredProgramRepository;
    this._masterProgramThirdTierRepository = masterProgramThirdTierRepository;
  }

  async execute({ batchId, usersId }) {
    const { id_third_tier_program: thirdTierProgramId } = await this._offeredProgramRepository.readyByBatchAndUsersId({ batchId, usersId });
    const thirdTierProgram = new GetMasterProgramThirdTier(await this._masterProgramThirdTierRepository.readById({ id: thirdTierProgramId }));
    return thirdTierProgram;
  }
}

module.exports = GetProgramThirdTierByUsersAndBatch;
