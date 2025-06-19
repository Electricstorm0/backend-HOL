const LEADMasterDivisionRepository = require('../../../../../Domains/program_main/lead/division/LEADMasterDivisionRepository');

class LEADMasterDivisionRepositoryMySQL
  extends LEADMasterDivisionRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ name }) {
    const query = {
      text: 'INSERT INTO `master_lead_division` (name) VALUES (?)',
      values: [name],
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
      text: 'SELECT * FROM `master_lead_division`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_lead_division` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_lead_division` SET ? WHERE id = ?',
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
      text: 'DELETE FROM `master_lead_division` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = LEADMasterDivisionRepositoryMySQL;
