class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { email, password } = payload;

    this.email = email;
    this.password = password;
  }

  _verifyPayload({ email, password }) {
    if (!email || !password) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (email.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }
  }
}

module.exports = RegisterUser;
