const HOLUsersInvolvementsRepository = require('../../../../../../../Domains/program_main/hol/temp-Users/journey/involvements/HOLUsersInvolvementsRepository');

class HOLUsersInvolvementsRepositoryMySQL extends HOLUsersInvolvementsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ usersEventsHOLId, usersHOLId }) {
    const query = {
      text: 'INSERT INTO `tx_hol_involvements` (id_users_events,id_users_hol) VALUES (?,?)',
      values: [usersEventsHOLId, usersHOLId],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_involvements`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_involvements` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async readByUsersEventsId({ usersEventsHOLId }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_involvements` WHERE id_users_events=?',
      values: [usersEventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result.length > 0;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_involvements` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_involvements` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersInvolvementsRepositoryMySQL;
