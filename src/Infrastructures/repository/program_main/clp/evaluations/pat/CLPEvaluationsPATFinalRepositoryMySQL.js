const CLPEvaluationsPATFinalRepository = require('../../../../../../Domains/program_main/clp/evaluations/pat/CLPEvaluationsPATFinalRepository');

class CLPEvaluationsPATFinalRepositoryMySQL
  extends
  CLPEvaluationsPATFinalRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    note, evaluationTotal, evaluationAverage, clpPATEvaluationsId, usersCLPId,
  }) {
    const query = {
      text: 'INSERT INTO `tx_clp_evaluations_pat_final` (note,  total, average, id_clp_pat_evaluations,  id_clp_users) VALUES (?, ?, ?, ?, ?)',
      values: [note, evaluationTotal, evaluationAverage, clpPATEvaluationsId, usersCLPId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result.insertId;
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `tx_clp_evaluations_pat_final`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_evaluations_pat_final` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readUsersHasEvaluated({ usersId, usersIdHasEvaluated }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_evaluations_pat_final` AS EPF WHERE EPF.id_clp_users = ? AND EPF.id_clp_pat_evaluations = ?',
      values: [usersId, usersIdHasEvaluated],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result.length > 0;
  }

  async readEvaluatedByEvaluationsPATId({ id }) {
    const query = {
      text: `SELECT SUM(average) AS finalEvaluationAverage, SUM(average) / (COUNT(*)) AS finalEvaluationTotal
      FROM 'tx_clp_evaluations_pat_final' AS EPF 
      WHERE EPF.id_clp_pat_evaluations = ?`,
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readCountByUsersId({ id }) {
    const query = {
      text: 'SELECT COUNT(*) AS hasEvaluated FROM tx_clp_evaluations_pat_final WHERE id_clp_users = ?',
      values: [id],
    };

    const [data] = await this._pool.query(query.text, query.values);

    return data[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_clp_evaluations_pat_final` SET ? WHERE id = ?',
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
      text: 'DELETE FROM `tx_clp_evaluations_pat_final` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPEvaluationsPATFinalRepositoryMySQL;
