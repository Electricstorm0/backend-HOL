const HOLRecommendationsRepository = require('../../../../../Domains/program_main/hol/Recomendations/HOLRecommendationsRepository');

class HOLRecommendationsRepositoryMyQL extends HOLRecommendationsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ HOLUsersRecommendationId, institutions, purposes, deadline, details }) {
    const query = {
      text: 'INSERT INTO `tx_hol_recomendations` (id_hol_users_recommendations,	institutions,	pusposes,	deadline,	details) VALUES (?,?,?,?,?)',
      values: [HOLUsersRecommendationId, institutions, purposes, deadline, details],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_recomendations`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_recomendations` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async readByUserId({ HOLUsersRecommendationId }) {
    const query = {
      text: 'SELECT r.*, mrs.name as status FROM `tx_hol_recomendations` as r right JOIN tx_hol_users_recommendations_status as rs on rs.id_hol_recommendations = r.id LEFT JOIN master_hol_recommendations_status as mrs on mrs.id = rs.id_recommendations_status WHERE id_hol_users_recommendations=?',
      values: [HOLUsersRecommendationId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_recomendations` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_recomendations` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLRecommendationsRepositoryMyQL;
