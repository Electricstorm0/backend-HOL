class GetMasterProgramRole {
  constructor(payload) {
    const { id, role } = payload;

    this.roleId = id;
    this.roleName = role;
  }
}

module.exports = GetMasterProgramRole;
