const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');

class AuthenticationRepositoryMySQL extends AuthenticationRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications (token) VALUES (?)',
      values: [token],
    };

    await this._pool.query(query.text, query.values);
  }

  async checkAvailabilityToken(token) {
    const query = {
      text: 'SELECT `token` FROM authentications WHERE `token` = ?',
      values: [token],
    };

    const [result] = await this._pool.query(query.text, query.values);

    if (!result.length > 0) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = ?',
      values: [token],
    };

    await this._pool.query(query.text, query.values);
  }
}

module.exports = AuthenticationRepositoryMySQL;
