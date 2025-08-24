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
      text: `WITH latest_batch AS (
    SELECT 
        op.id_users,
        MAX(b.batch) AS max_batch
    FROM tx_offered_program op
    JOIN master_batch b ON b.id = op.id_batch
    GROUP BY op.id_users
)
    SELECT r.id,
        CONCAT(ud.first_name, ' ', ud.last_name) AS Alumni_Name,
        stp.name AS Program,
        b.batch AS Batch,
        YEAR(b.date_start) AS Year,
        r.deadline,
        mrs.name AS status
    FROM tx_hol_recommendations r
    JOIN tx_users_detail ud 
        ON ud.id = r.id_hol_users_recommendations
    JOIN tx_offered_program op 
        ON op.id_users = r.id_hol_users_recommendations
    JOIN master_batch b 
        ON b.id = op.id_batch
    JOIN latest_batch lb 
        ON lb.id_users = op.id_users 
        AND lb.max_batch = b.batch
    JOIN master_third_tier_program mtp 
        ON mtp.id = op.id_third_tier_program
    JOIN master_second_tier_program stp 
        ON stp.id = mtp.id_second_tier_program
    LEFT JOIN tx_hol_users_recommendations_status rs 
        ON rs.id_hol_recommendations = r.id
    LEFT JOIN master_hol_recommendations_status mrs 
        ON mrs.id = rs.id_recommendations_status
    ORDER BY b.batch DESC
    LIMIT ?, ?;


      `,
      values: [skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readByStatusId({ skip, numPerPage, recommendationStatusId }) {
    const query = {
      text: `WITH latest_batch AS (
    SELECT 
        op.id_users,
        MAX(b.batch) AS max_batch
    FROM tx_offered_program op
    JOIN master_batch b ON b.id = op.id_batch
    GROUP BY op.id_users
)
    SELECT r.id,
        CONCAT(ud.first_name, ' ', ud.last_name) AS Alumni_Name,
        stp.name AS Program,
        b.batch AS Batch,
        YEAR(b.date_start) AS Year,
        r.deadline,
        mrs.name AS status
    FROM tx_hol_recommendations r
    JOIN tx_users_detail ud 
        ON ud.id = r.id_hol_users_recommendations
    JOIN tx_offered_program op 
        ON op.id_users = r.id_hol_users_recommendations
    JOIN master_batch b 
        ON b.id = op.id_batch
    JOIN latest_batch lb 
        ON lb.id_users = op.id_users 
        AND lb.max_batch = b.batch
    JOIN master_third_tier_program mtp 
        ON mtp.id = op.id_third_tier_program
    JOIN master_second_tier_program stp 
        ON stp.id = mtp.id_second_tier_program
    LEFT JOIN tx_hol_users_recommendations_status rs 
        ON rs.id_hol_recommendations = r.id
    LEFT JOIN master_hol_recommendations_status mrs 
        ON mrs.id = rs.id_recommendations_status
    WHERE rs.id_recommendations_status=? 
    ORDER BY b.batch DESC
    LIMIT ?, ?;`,
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
