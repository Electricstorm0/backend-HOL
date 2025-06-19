const CLPEvaluationsPATScoreRepository = require('../../../../../../Domains/program_main/clp/evaluations/pat/CLPEvaluationsPATScoreRepository');

class CLPEvaluationsPATScoreRepositoryMySQL
  extends CLPEvaluationsPATScoreRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    classificationId, evaluation, finalEvaluationPATId,
  }) {
    const query = {
      text: 'INSERT INTO `tx_clp_evaluations_pat_score` (id_clp_classification_pat, evaluation, id_clp_evaluations_pat_final) VALUES (?, ?, ?)',
      values: [classificationId, evaluation, finalEvaluationPATId],
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
      text: 'SELECT * FROM `tx_clp_evaluations_pat_score`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_evaluations_pat_score` WHERE id = ?',
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
      text: 'SELECT * FROM `tx_clp_evaluations_pat_score` WHERE id_clp_pat_final_evaluation_by_friends = ?',
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
      text: 'UPDATE `tx_clp_evaluations_pat_score` SET ? WHERE id = ?',
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
      text: 'DELETE FROM `tx_clp_evaluations_pat_score` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPEvaluationsPATScoreRepositoryMySQL;
