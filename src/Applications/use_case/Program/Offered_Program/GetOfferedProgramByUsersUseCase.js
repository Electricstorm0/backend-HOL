const GetMasterBatch = require('../../../../Domains/batch/entities/GetMasterBatch');
const GetOfferedProgram = require('../../../../Domains/program/entities/GetOfferedProgram');

class GetOfferedProgramByUsersUseCase {
  constructor({ offeredProgramRepository, masterBatchRepository }) {
    this._offeredProgramRepository = offeredProgramRepository;
    this._masterBatchRepository = masterBatchRepository;
  }

  async execute({ id: usersId }) {
    const offeredProgram = await this._offeredProgramRepository.readByUsersId({ id: usersId });
    const result = await Promise.all(offeredProgram.map(async (value) => ({
      ...new GetOfferedProgram({ ...value }),
      batch: ({ ...new GetMasterBatch(await this._masterBatchRepository.readById({ id: value.id_batch })) }),
    })));
    return result;
  }
}

module.exports = GetOfferedProgramByUsersUseCase;
