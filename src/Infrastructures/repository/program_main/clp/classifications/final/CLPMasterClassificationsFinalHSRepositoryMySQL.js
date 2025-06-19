const CLPMasterClassificationsFinalHSRepository = require('../../../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalHSRepository');

class CLPMasterClassificationsFinalHSRepositoryMySQL extends CLPMasterClassificationsFinalHSRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ leadDivisionInstitutionId, classification }) {
    const query = {
      text: 'INSERT INTO `master_clp_classification_final_hs` (id_lead_division_institution,classification) VALUES (?,?)',
      values: [leadDivisionInstitutionId, classification],
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
      text: 'SELECT COUNT(*) as numRows FROM `master_clp_classifications_final_hs`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result[0].numRows;
  }

  async read({ skip, numPerPage }) {
    const query = {
      text: 'SELECT * FROM `master_clp_classifications_final_hs` LIMIT ?, ?',
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
      text: 'SELECT * FROM `master_clp_classifications_final_hs` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByDivisionInstitutionsId({ id }) {
    const query = {
      text: 'SELECT * FROM `master_clp_classifications_final_hs` WHERE id_lead_division_institutions = ?',
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
      text: 'UPDATE `master_clp_classification_final_hs` SET ? WHERE id = ?',
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
      text: 'DELETE FROM `master_clp_classification_final_hs` WHERE id = ? ',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPMasterClassificationsFinalHSRepositoryMySQL;
