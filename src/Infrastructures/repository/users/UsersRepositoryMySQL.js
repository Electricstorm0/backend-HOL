const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const UserRepository = require('../../../Domains/users/UsersRepository');

class UsersRepositoryMySQL extends UserRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCount() {
    const query = {
      text: 'SELECT COUNT(*) as numRows FROM `tx_users`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result[0].numRows;
  }

  async get({ skip, numPerPage }) {
    const query = {
      text: 'SELECT username, email FROM `tx_users` LIMIT ?, ?',
      values: [skip, numPerPage],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async verifyAvailableEmail({ email }) {
    const query = {
      text: 'SELECT id FROM `tx_users` WHERE `email` = ?',
      values: [email],
    };

    const [result] = await this._pool.query(query.text, query.values);

    if (result.length > 0) {
      throw new InvariantError('email is used');
    }
  }

  async verifyUserCredential({ email }) {
    const query = {
      text: 'SELECT id, password FROM `tx_users` WHERE `email` = ?',
      values: [email],
    };

    const [result] = await this._pool.query(query.text, query.values);

    if (!result.length > 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah atau sudah di deleted');
    }

    return result[0];
  }

  async create({ username, email, password }) {
    const query = {
      text: 'INSERT INTO tx_users (username, email, password) VALUES (?, ?,?)',
      values: [username, email, password],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return { id: result.insertId, email };
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM tx_users WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_users` SET ? WHERE id=?',
      values: [id, payload],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_users` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = UsersRepositoryMySQL;
