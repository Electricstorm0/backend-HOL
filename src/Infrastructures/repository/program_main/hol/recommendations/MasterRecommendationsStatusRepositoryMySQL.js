const MasterRecommendationsStatusRepository = require('../../../../../Domains/program_main/hol/Recomendations/MasterRecommendationsStatusRepository');

class MasterRecommendationsStatusRepositoryMyQL extends MasterRecommendationsStatusRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ name }) {
    const query = {
      text: 'INSERT INTO `master_hol_recommendations_status` (name) VALUES (?)',
      values: [name],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `master_hol_recommendations_status`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_hol_recommendations_status` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_hol_recommendations_status` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_hol_recommendations_status` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = MasterRecommendationsStatusRepositoryMyQL;
