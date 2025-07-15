const HOLRecommendationsStatusRepository = require('../../../../../Domains/program_main/hol/recommendations/HOLRecommendationsStatusRepository');

class HOLRecommendationsStatusRepositoryMyQL extends HOLRecommendationsStatusRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountRecommendation() {
    const query = {
      text: 'SELECT COUNT(*) as totalAlumni From tx_hol_users_recommendations_status ',
    };
    const [result] = await this._pool.query(query.text);
    return result[0];
  }
  async readCountRecommendationByStatus({ recommendationStatusId }) {
    const query = {
      text: 'SELECT COUNT(*) as totalAlumni From tx_hol_users_recommendations_status where id_recommendations_status = ? ',
      values: [recommendationStatusId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async create({ recommendationStatusId, HOLRecommendationId, updatedBy, isChecked, note }) {
    const query = {
      text: `INSERT INTO tx_hol_users_recommendations_status (id_recommendations_status,
      id_hol_recommendations,updated_by,is_checked,note) 
      VALUES (?,?,?,?,?)`,
      values: [recommendationStatusId, HOLRecommendationId, updatedBy, isChecked, note],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_users_recommendations_status`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_users_recommendations_status` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ recommendationHolId, adminId, isChecked, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_users_recommendations_status` SET ?,is_checked=? ,updated_by =? WHERE id_hol_recommendations = ?',
      values: [payload, isChecked, adminId, recommendationHolId],
    };
    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_users_recommendations_status` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLRecommendationsStatusRepositoryMyQL;
