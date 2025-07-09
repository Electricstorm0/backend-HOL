/* eslint-disable no-restricted-syntax */
const GetMasterBatch = require('../../../../../Domains/batch/entities/GetMasterBatch');
const GetMasterProgramRole = require('../../../../../Domains/program/entities/GetMasterProgramRole');
const HOLGetUsersMe = require('../../../../../Domains/program_main/hol/Users/entities/HOLGetUsersMe');

class HOLGetUsersMeUseCase {
  constructor({ usersDetailRepository, masterProgramRoleRepository, offeredProgramRepository, masterBatchRepository }) {
    this._usersDetailRepository = usersDetailRepository;
    this._masterProgramRoleRepository = masterProgramRoleRepository;
    this._offeredProgramRepository = offeredProgramRepository;
    this._masterBatchRepository = masterBatchRepository;
  }

  async checkHasActiveProgramByUsersId({ id }) {
    const offeredProgram = await this._offeredProgramRepository.readByUsersId({ id });
    const currentlyActiveProgram = await Promise.all(
      offeredProgram.map(async (value) => ({
        statusOffered: await this._masterBatchRepository.verifyCurrentlyActiveById({ id: value.id_batch }),
        batch: new GetMasterBatch(await this._masterBatchRepository.readById({ id: value.id_batch })),
        role: new GetMasterProgramRole(await this._masterProgramRoleRepository.readById({ id: value.id_role })),
      }))
    );

    let hasActiveProgram = {};
    for (const item of currentlyActiveProgram) {
      if (item.statusOffered) {
        hasActiveProgram = { ...item };
        break;
      } else {
        hasActiveProgram = { ...item };
      }
    }

    return hasActiveProgram;
  }

  async execute({ id: usersId }) {
    const users = await this._usersDetailRepository.readById({ id: usersId });
    const currentlyProgram = await this.checkHasActiveProgramByUsersId({ id: usersId });
    return new HOLGetUsersMe({ ...users, currentlyProgram });
  }
}

module.exports = HOLGetUsersMeUseCase;
