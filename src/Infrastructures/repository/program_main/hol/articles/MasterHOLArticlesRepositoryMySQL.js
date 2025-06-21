const MasterHOLArticlesRepository = require('../../../../../Domains/program_main/hol/articles/MasterHOLArticlesRepository');

class MasterHOLArticlesRepositoryMySQL extends MasterHOLArticlesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
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
  async readById({ id }) {
    const query = {
      text: 'SELECT CONCAT(ud.first_name,"",ud.last_name) as penulis,stp.name as program, ma.*, hua.status FROM master_articles as ma JOIN tx_hol_users_articles as hua ON hua.id_article = ma.id JOIN tx_users_detail as ud ON ud.id = hua.id_users_hol JOIN tx_offered_program as op on op.id_users = ud.id JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program JOIN master_second_tier_program as stp on stp.id = mtp.id_second_tier_program WHERE ma.id=?',
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
