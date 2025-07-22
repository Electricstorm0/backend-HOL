class HOLAddUsers {
  constructor(payload) {
    const { fullname, email, password, batchId, thirdTierProgramId } = payload;

    this._verifyPayload(payload);

    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.thirdTierProgramId = thirdTierProgramId;
    this.batchId = batchId;
  }

  _verifyPayload(payload) {
    const { fullname, email, password } = payload;

    if (!fullname || !email || !password) {
      throw new Error('HOL_ADD_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof fullname !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('HOL_ADD_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = HOLAddUsers;
