const InvariantError = require('../../../../../../Commons/exceptions/InvariantError');
const CLPEvaluationsFinalRepository = require('../../../../../../Domains/program_main/clp/evaluations/final/CLPEvaluationsFinalRepository');

class CLPEvaluationsFinalRepositoryMySQL extends CLPEvaluationsFinalRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    bcfEmployeedId, total, average, note, certificateURL, clpMentorId,
  }) {
    const query = {
      text: 'INSERT INTO `tx_clp_evaluations_final` (id_bcf_employees,total,average,note,certificate_url,id_clp_mentor) VALUES (?,?,?,?,?,?)',
      values: [bcfEmployeedId, total, average, note, certificateURL, clpMentorId],
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
      text: 'SELECT * FROM `tx_clp_evaluations_final` ',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async verifyUsersHasAssigned({ id }) {
    const query = {
      text: 'SELECT id FROM `tx_clp_evaluations_final` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    if (!result.length > 0) {
      throw new InvariantError('Mahasiswa belum di assign dengan Mentor, hubungi Admin/Mentors/Co-Mentors!');
    }
  }

  async readEvaluationsByEvaluationsFinalId({ id }) {
    const query = {
      text: `SELECT
      SUM((EH.evaluation * 75/100)  + (EB.evaluation * 25/100)) +
      SUM((ES.evaluation * 75/100) +  (EB.evaluation * 25/100)) AS evaluationTotal
      FROM tx_clp_evaluations_final_hs EH
      INNER JOIN tx_clp_evaluations_final_bcf EB ON EH.id_clp_kpi_bcf = EB.id_clp_kpi_bcf
      INNER JOIN tx_clp_evaluations_final_ss ES ON ES.id_clp_kpi_bcf = EH.id_clp_kpi_bcf
      WHERE EH.id_clp_final_evaluations = ? AND EB.id_clp_final_evaluations = ? AND ES.id_clp_final_evaluations = ?
      GROUP BY EB.id_clp_final_evaluations, EH.id_clp_final_evaluations, ES.id_clp_final_evaluations;`,
      values: [id, id, id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }

  async update({ totalEvaluation, averageEvaluation, id }) {
    const query = {
      text: 'UPDATE `tx_clp_evaluations_final` SET total = ?, average = ? WHERE id = ?',
      values: [totalEvaluation, averageEvaluation, id],
    };

    await this._pool.query(query.text, query.values);
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_clp_evaluations_final` WHERE id = ? ',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPEvaluationsFinalRepositoryMySQL;
