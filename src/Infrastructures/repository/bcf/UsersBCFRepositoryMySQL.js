const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const UsersBCFRepository = require('../../../Domains/bcf/UsersBCFRepository');

class UsersBCFRepositoryMySQL extends UsersBCFRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_users_bcf` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async verifyUserCredential({ email }) {
    const query = {
      text: 'SELECT id, password FROM `tx_users_bcf` WHERE `email` = ?',
      values: [email],
    };

    const [result] = await this._pool.query(query.text, query.values);

    if (!result.length > 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah atau sudah di deleted!');
    }

    return result[0];
  }
}

module.exports = UsersBCFRepositoryMySQL;
