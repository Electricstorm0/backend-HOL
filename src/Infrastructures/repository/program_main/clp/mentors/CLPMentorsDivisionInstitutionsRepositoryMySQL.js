const CLPMentorsDivisionInstitutionsRepository = require('../../../../../Domains/program_main/clp/mentors/CLPMentorsDivisionInstitutionsRepository');

class CLPMentorsDivisionInstitutionsRepositoryMySQL
  extends CLPMentorsDivisionInstitutionsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create(clpMentorsId, leadDivisionInstitutionsId) {
    const query = {
      text: 'INSERT INTO `tx_clp_mentors_division_institutions` (id_clp_mentors, id_lead_division_institutions) VALUES (?,?)',
      values: [clpMentorsId, leadDivisionInstitutionsId],
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
      text: 'SELECT * FROM `tx_clp_mentors_division_institutions`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_mentors_division_institutions` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result[0];
  }

  async readByMentorsId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_mentors_division_institutions` WHERE id_clp_mentors = ?',
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
      text: 'UPDATE `tx_clp_mentors_division_institutions` SET ? WHERE id = ?',
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
      text: 'DELETE FROM `tx_clp_mentors_division_institutions` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPMentorsDivisionInstitutionsRepositoryMySQL;
