const HOLRecommendationsRepository = require('../../../../../Domains/program_main/hol/recommendations/HOLRecommendationsRepository');

class HOLRecommendationsRepositoryMyQL extends HOLRecommendationsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ HOLUsersRecommendationId, institutions, purposes, deadline, details }) {
    const query = {
      text: `INSERT INTO tx_hol_recommendations (id_hol_users_recommendations,	institutions,	pusposes,	deadline,	details) 
      VALUES (?,?,?,?,?)`,
      values: [HOLUsersRecommendationId, institutions, purposes, deadline, details],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read({ skip, numPerPage }) {
    const query = {
      text: `SELECT concat(ud.first_name," ", ud.last_name) as Alumni_Name,stp.name as Program, b.batch as Batch, 
      YEAR(b.date_start) as Year,   r.deadline, mrs.name as status 
      FROM tx_hol_recommendations as r 
      JOIN tx_users_detail as ud on ud.id = r.id_hol_users_recommendations 
      JOIN tx_offered_program as op on op.id_users = r.id_hol_users_recommendations 
      JOIN master_batch as b on b.id = op.id_batch 
      JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program 
      JOIN master_second_tier_program as stp on stp.id = mtp.id_second_tier_program 
      LEFT JOIN tx_hol_users_recommendations_status as rs on rs.id_hol_recommendations = r.id 
      LEFT JOIN master_hol_recommendations_status as mrs on mrs.id = rs.id_recommendations_status 
      ORDER BY rs.id ASC LIMIT ?,?
      `,
      values: [skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readByStatusId({ skip, numPerPage, recommendationStatusId }) {
    const query = {
      text: `SELECT concat(ud.first_name," ", ud.last_name) as Alumni_Name,stp.name as Program, b.batch as Batch, 
      YEAR(b.date_start) as Year,   r.deadline, mrs.name as status 
      FROM tx_hol_recommendations as r 
      JOIN tx_users_detail as ud on ud.id = r.id_hol_users_recommendations 
      JOIN tx_offered_program as op on op.id_users = r.id_hol_users_recommendations 
      JOIN master_batch as b on b.id = op.id_batch 
      JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program 
      JOIN master_second_tier_program as stp on stp.id = mtp.id_second_tier_program 
      right JOIN tx_hol_users_recommendations_status as rs on rs.id_hol_recommendations = r.id 
      LEFT JOIN master_hol_recommendations_status as mrs on mrs.id = rs.id_recommendations_status 
      WHERE rs.id_recommendations_status=? 
      group by ud.id
      ORDER BY rs.id ASC LIMIT ?,?`,
      values: [recommendationStatusId, skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_recommendations` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async readByUserId({ HOLUsersRecommendationId }) {
    const query = {
      text: `SELECT r.*, mrs.name as status 
      FROM tx_hol_recommendations as r 
      right JOIN tx_hol_users_recommendations_status as rs on rs.id_hol_recommendations = r.id 
      LEFT JOIN master_hol_recommendations_status as mrs on mrs.id = rs.id_recommendations_status 
      WHERE id_hol_users_recommendations=?`,
      values: [HOLUsersRecommendationId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_recommendations` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_recommendations` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLRecommendationsRepositoryMyQL;
