const MasterRegenciesRepository = require('../../../../Domains/domicile/regencies/MasterRegenciesRepository');

class MasterRegenciesRepositoryMySQL
  extends MasterRegenciesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ provinceId, name }) {
    const query = {
      text: 'INSERT INTO `master_domicile_regencies` (id_provincies, name) VALUES (?,?)',
      values: [provinceId, name],
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
      text: 'SELECT * FROM master_domicile_regencies',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM master_domicile_regencies WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByProvinciesId({ id }) {
    const query = {
      text: 'SELECT * FROM `master_domicile_regencies` WHERE `id_provincies` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_domicile_regencies` SET ? WHERE `id` = ?',
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
      text: 'DELETE FROM `master_domicile_regencies` WHERE `id` = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = MasterRegenciesRepositoryMySQL;
