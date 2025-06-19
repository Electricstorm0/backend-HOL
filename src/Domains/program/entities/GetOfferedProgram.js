/* eslint-disable camelcase */
class GetOfferedProgram {
  constructor(payload) {
    const {
      id, id_users, id_role, id_third_tier_program, id_batch,
    } = payload;

    this.offeredProgramId = id;
    this.usersId = id_users;
    this.roleId = id_role;
    this.thirdTierProgramId = id_third_tier_program;
    this.batchId = id_batch;
  }
}

module.exports = GetOfferedProgram;
