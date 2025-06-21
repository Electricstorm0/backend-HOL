const HOLUsersArticlesRepository = require('../../../../../Domains/program_main/hol/articles/HOLUsersArticlesRepository');

class HOLUsersArticlesRepositoryMySQL extends HOLUsersArticlesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountArticlesByUsersId({ usersHOLId }) {
    const query = {
      text: 'SELECT COUNT(*) from `tx_hol_users_articles` where id_users_hol = ?',
      values: [usersHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async create({ articleId, usersHOLId, status }) {
    const query = {
      text: 'INSERT INTO `tx_hol_users_articles` (	id_article,	id_users_hol, status) VALUES (?,?,?)',
      values: [articleId, usersHOLId, status],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_users_articles`',
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

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_users_articles` SET ? WHERE id_users = ?',
      values: [payload, id],
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
