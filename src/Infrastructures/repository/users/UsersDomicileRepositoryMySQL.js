const UsersDomicileRepository = require('../../../Domains/users/UsersDomicileRepository');

class UsersDomicileRepositoryMySQL
  extends UsersDomicileRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    regencieId, provinceId, status, completeAddress, batchId, usersId,
  }) {
    const query = {
      text: 'INSERT INTO `tx_users_domicile` (id_regencies, id_provincies, status, complete_address, id_batch, id_users) VALUES (?,?,?,?,?,?) ',
      values: [regencieId, provinceId, status, completeAddress, batchId, usersId],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return {
      id: result.insertId,
    };
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `tx_users_domicile` ',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_users_domicile` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result[0];
  }

  async update({ payload, id }) {
    const query = {
      text: 'UPDATE `tx_users_domicile` SET ? WHERE id = ?',
      values: [payload, id],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async readByUsersId({ id }) {
    const query = {
      text: 'SELECT * FROM tx_users_domicile WHERE id_users = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }

  async readByUsersAndBatchId({ usersId, batchId }) {
    const query = {
      text: 'SELECT * FROM tx_users_domicile WHERE id_users = ? AND id_batch = ?',
      values: [usersId, batchId],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_users_domicile` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = UsersDomicileRepositoryMySQL;
