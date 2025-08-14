const MasterHOLArticlesRepository = require('../../../../../Domains/program_main/hol/articles/MasterHOLArticlesRepository');

class MasterHOLArticlesRepositoryMySQL extends MasterHOLArticlesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountArticle() {
    const query = {
      text: 'SELECT COUNT(*) as total FROM `master_articles`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async create({ title, abstract, fileUrl, citation, linkCitation }) {
    const query = {
      text: 'INSERT INTO `master_articles` (title,	abstract,	url_file,	citation, link_citation	) VALUES (?,?,?,?,?)',
      values: [title, abstract, fileUrl, citation, linkCitation],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `master_articles`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async readAllByStatus({ skip, numPerPage }) {
    const query = {
      text: `WITH latest_batch AS (
    SELECT 
        op.id_users,
        MAX(b.batch) AS max_batch
    FROM tx_offered_program op
    JOIN master_batch b 
        ON b.id = op.id_batch
    GROUP BY op.id_users
)
SELECT 
    CONCAT(ud.first_name, ' ', ud.last_name) AS penulis,
    stp.name AS program,
    ma.title,hua.*
FROM master_articles ma
JOIN tx_hol_users_articles hua 
    ON hua.id_article = ma.id
JOIN tx_users_detail ud 
    ON ud.id = hua.id_users_hol
JOIN tx_offered_program op 
    ON op.id_users = ud.id
JOIN master_batch b 
    ON b.id = op.id_batch
JOIN latest_batch lb 
    ON lb.id_users = op.id_users 
    AND lb.max_batch = b.batch
JOIN master_third_tier_program mtp 
    ON mtp.id = op.id_third_tier_program
JOIN master_second_tier_program stp 
    ON stp.id = mtp.id_second_tier_program
WHERE hua.status = 'Approved'
ORDER BY b.batch DESC

      `,
      values: [skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async readById({ id }) {
    const query = {
      text: `SELECT CONCAT(ud.first_name," ",ud.last_name) as penulis,stp.name as program, ma.*, hua.status,hua.updated_at
      FROM master_articles as ma 
      JOIN tx_hol_users_articles as hua ON hua.id_article = ma.id 
      JOIN tx_users_detail as ud ON ud.id = hua.id_users_hol 
      JOIN tx_offered_program as op on op.id_users = ud.id 
      JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program 
      JOIN master_second_tier_program as stp on stp.id = mtp.id_second_tier_program 
      WHERE ma.id=?`,
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_articles` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_articles` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = MasterHOLArticlesRepositoryMySQL;
