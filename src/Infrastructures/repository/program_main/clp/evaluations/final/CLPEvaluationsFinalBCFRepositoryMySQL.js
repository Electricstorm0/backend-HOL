const CLPEvaluationsFinalBCFRepository = require('../../../../../../Domains/program_main/clp/evaluations/final/CLPEvaluationsFinalBCFRepository');

class CLPEvaluationsFinalBCFRepositoryMySQL extends CLPEvaluationsFinalBCFRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    clpKpiBCFId, clpFinalEvaluationId, evaluation, note,
  }) {
    const query = {
      text: 'INSERT INTO `tx_clp_evaluations_final_bcf` (id_clp_kpi_bcf, id_clp_final_evaluations, evaluation, note) VALUES (?,?,?,?) ',
      values: [clpKpiBCFId, clpFinalEvaluationId, evaluation, note],
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
      text: 'SELECT * FROM `tx_clp_evaluations_final_bcf`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_evaluations_final_bcf` WHERE id = ?',
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
      text: 'SELECT * FROM `tx_clp_evaluations_final_bcf` WHERE id_clp_final_evaluations = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async updatePATEvaluations({ evaluationTotal, finalEvaluationsId }) {
    const query = {
      text: 'UPDATE `tx_clp_evaluations_final_bcf` SET evaluation = ?, note = ? WHERE id_clp_final_evaluations = ? AND id_clp_kpi_bcf = ?',
      values: [evaluationTotal, 'Dinilai otomatis oleh sistem PAT!', 3, finalEvaluationsId],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_clp_evaluations_final_bcf` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPEvaluationsFinalBCFRepositoryMySQL;
