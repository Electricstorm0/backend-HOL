const CLPEvaluationsFinalHSRepository = require('../../../../../../Domains/program_main/clp/evaluations/final/CLPEvaluationsFinalHSRepository');

class CLPEvaluationsFinalHSRepositoryMySQL extends CLPEvaluationsFinalHSRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    clpKpiBcfId, clpKpiHardskillId, clpFinalEvaluationId, evaluation, note,
  }) {
    const query = {
      text: 'INSERT INTO `tx_clp_evaluations_final_hs` (id_clp_kpi_bcf, id_clp_kpi_hs, id_clp_final_evaluations, evaluation, note) VALUES (?,?,?,?,?) ',
      values: [clpKpiBcfId, clpKpiHardskillId, clpFinalEvaluationId, evaluation, note],
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
      text: 'SELECT * FROM `tx_clp_evaluations_final_hs`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_evaluations_final_hs` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result[0];
  }

  async readByFinalEvaluationsId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_evaluations_final_hs` WHERE id_clp_final_evaluations = ?',
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
      text: 'UPDATE `tx_clp_evaluations_final_hs` SET ? WHERE id=?',
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
      text: 'DELETE FROM `tx_clp_evaluations_final_hs` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPEvaluationsFinalHSRepositoryMySQL;
