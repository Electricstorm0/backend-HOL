const MasterProvinciesRepository = require('../../../../Domains/domicile/provincies/MasterProvinciesRepository');

class MasterProvinciesRepositoryMySQL
  extends MasterProvinciesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create(name) {
    const query = {
      text: 'INSERT INTO `master_domicile_provincies` (name) VALUES (?)',
      values: [name],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result.insertId;
  }

  async update({ name, provinceId }) {
    const query = {
      text: 'UPDATE master_domicile_provincies SET `name` = ? WHERE `id` = ?',
      values: [name, provinceId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async delete(provinceId) {
    const query = {
      text: 'DELETE FROM `master_domicile_provincies` WHERE `id` = ?',
      values: [provinceId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `master_domicile_provincies`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_domicile_provincies` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }
}

module.exports = MasterProvinciesRepositoryMySQL;
