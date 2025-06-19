const MasterUniversitiesRepository = require('../../../Domains/universities/MasterUniversitiesRepository');

class MasterUniversitiesRepositoryMySQL extends MasterUniversitiesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    name, type, provinceId, regencieId,
  }) {
    const query = {
      text: 'INSERT INTO `master_universities` (name,type,id_province,id_regencie) VALUES (?,?,?,?) ',
      values: [name, type, provinceId, regencieId],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return {
      id: result.insertId,
    };
  }

  async readCount() {
    const query = {
      text: 'SELECT COUNT(*) as numRows FROM `master_universities`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result[0].numRows;
  }

  async update({ payload, id }) {
    const query = {
      text: 'UPDATE `master_universities` SET ? WHERE id = ?',
      values: [payload, id],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async read({ skip, numPerPage }) {
    const query = {
      text: 'SELECT * FROM master_universities LIMIT ?, ?',
      values: [skip, numPerPage],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM master_universities WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_universities` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = MasterUniversitiesRepositoryMySQL;
