const HOLUsersAchievementsRepository = require('../../../../../../../Domains/program_main/hol/temp-Users/journey/achievements/HOLUsersAchievementsRepository');

class HOLUsersAchievementsRepositoryMySQL extends HOLUsersAchievementsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ holUsersId, eventsName, eventsYear, bcfContribution, achievements }) {
    const query = {
      text: 'INSERT INTO `tx_hol_achievements` (id_users_hol,events_name,events_year,bcf_contribution,achievements) VALUES (?,?,?,?,?)',
      values: [holUsersId, eventsName, eventsYear, bcfContribution, achievements],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_achievements`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_achievements` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_achievements` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_achievements` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersAchievementsRepositoryMySQL;
