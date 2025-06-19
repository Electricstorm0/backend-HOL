/* eslint-disable no-restricted-syntax */

const GetMasterBatch = require('../../../../Domains/batch/entities/GetMasterBatch');

class GetOfferedProgramCurrentActiveUseCase {
  constructor({ masterBatchRepository, offeredProgramRepository, masterProgramRoleRepository }) {
    this._masterBatchRepository = masterBatchRepository;
    this._offeredProgramRepository = offeredProgramRepository;
    this._masterProgramRoleRepository = masterProgramRoleRepository;
  }

  // TESTING
  async checkStatusFromBatch({ batchId }) {
    const { startDate, endDate } = new GetMasterBatch({ ...(await this._masterBatchRepository.readById({ id: batchId })) });
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const today = new Date().getTime();
    const result = today >= start && today <= end;
    return result;
  }

  async execute({ id }) {
    const offeredProgram = await this._offeredProgramRepository.readByUsersId({ id });
    const currentlyActiveProgram = await Promise.all(
      offeredProgram.map(async (value) => ({
        ...value,
        role: await this._masterProgramRoleRepository.readById({ id: value.id_role }),
        statusFromStartEnd: await this.checkStatusFromBatch({ batchId: value.id_batch }),
        status: await this._masterBatchRepository.verifyCurrentlyActiveById({ id: value.id_batch }),
      }))
    );

    let roleId; // DEFAULT
    let batchId;
    let offeredProgramId;

    for (const item of currentlyActiveProgram) {
      if (item.status) {
        // STATUS IS CURRENT ACTIVE
        roleId = item.id_role;
        batchId = item.id_batch;
        offeredProgramId = item.id;
        break;
      } else {
        // IF STATUS NOT ACTIVE / LAST OFFERED BATCH
        roleId = item.id_role;
        batchId = item.id_batch;
        offeredProgramId = item.id;
      }
    }

    // const findCurrentlyActiveFromStatus = currentlyActiveProgram.find((obj) => obj.status === true);
    // const { id: roleId, role } = findCurrentlyActiveFromStatus.role;
    // console.log(roleId, role);
    return { roleId, batchId, offeredProgramId };
  }
}

module.exports = GetOfferedProgramCurrentActiveUseCase;
