const InvariantError = require('../../../../../../Commons/exceptions/InvariantError');
const CLPEvaluationsPATRepository = require('../../../../../../Domains/program_main/clp/evaluations/pat/CLPEvaluationsPATRepository');

class CLPEvaluationsPATRepositoryMySQL
  extends CLPEvaluationsPATRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create(total, average) {
    const query = {
      text: 'INSERT INTO `tx_clp_evaluations_pat` (total, average) VALUES (?,?)',
      values: [total, average],
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
      text: 'SELECT * FROM `tx_clp_evaluations_pat`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async update({ evaluationTotal, evaluationAverage, id }) {
    const query = {
      text: 'UPDATE `tx_clp_evaluations_pat` SET total = ?, average = ? WHERE id = ?',
      values: [evaluationTotal, evaluationAverage, id],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async verifyUsersHasAssigned({ id }) {
    const query = {
      text: 'SELECT id FROM `tx_clp_evaluations_pat` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    if (!result.length > 0) {
      throw new InvariantError('Sistem tidak bisa menilai, hubungi Admin/Mentors!');
    }
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_clp_evaluations_pat` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPEvaluationsPATRepositoryMySQL;
