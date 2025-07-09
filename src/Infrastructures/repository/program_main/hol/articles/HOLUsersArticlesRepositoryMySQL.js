const HOLUsersArticlesRepository = require('../../../../../Domains/program_main/hol/temp-Articles/HOLUsersArticlesRepository');

class HOLUsersArticlesRepositoryMySQL extends HOLUsersArticlesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountUsersArticle() {
    const query = {
      text: 'SELECT COUNT(*) as Jumlah from `tx_hol_users_articles` ',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readCountArticlesByUsersId({ usersHOLId }) {
    const query = {
      text: 'SELECT COUNT(*) as Jumlah from `tx_hol_users_articles` where id_users_hol = ?',
      values: [usersHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async create({ articleId, usersHOLId, status }) {
    const query = {
      text: 'INSERT INTO `tx_hol_users_articles` (	id_article,	id_users_hol, status) VALUES (?,?,?)',
      values: [articleId, usersHOLId, status],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }
  async read({ skip, numPerPage }) {
    const query = {
      text: 'SELECT hua.id, CONCAT(ud.first_name," ",ud.last_name) as penulis, ma.title, hua.status  FROM `tx_hol_users_articles` as hua JOIN `master_articles` as ma on ma.id = hua.id_article JOIN tx_users_detail as ud on ud.id = hua.id_users_hol ',
      values: [skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_users_articles` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readByUsersId({ usersHOLId }) {
    const query = {
      text: 'SELECT  ma.* ,hua.status FROM `tx_hol_users_articles` as hua JOIN `master_articles` as ma on ma.id = hua.id_article WHERE id_users_hol=?',
      values: [usersHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async updateStatusArticle({ id, status }) {
    const query = {
      text: 'UPDATE `tx_hol_users_articles` SET status= ? WHERE id = ?',
      values: [status, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_users_articles` WHERE id_users = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersArticlesRepositoryMySQL;
