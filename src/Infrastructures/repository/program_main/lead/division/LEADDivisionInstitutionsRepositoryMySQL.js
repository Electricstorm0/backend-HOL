const LEADDivisionInstitutionsRepository = require('../../../../../Domains/program_main/lead/division/LEADDivisionInstitutionsRepository');

class LEADDivisionInstitutionsRepositoryMySQL
  extends LEADDivisionInstitutionsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ leadInstitutionId, leadDivisionId }) {
    const query = {
      text: 'INSERT INTO `tx_lead_division_institutions` (id_lead_institution,id_lead_division) VALUES (?,?)',
      values: [leadInstitutionId, leadDivisionId],
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
      text: 'SELECT * FROM `tx_lead_division_institutions`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_lead_division_institutions` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByInstitutionsId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_lead_division_institutions` WHERE id_lead_institution = ?',
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
      text: 'UPDATE `tx_lead_division_institutions` SET ?  WHERE id = ?',
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
      text: 'DELETE FROM `tx_lead_division_institutions` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = LEADDivisionInstitutionsRepositoryMySQL;
