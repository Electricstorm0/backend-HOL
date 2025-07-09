const HOLUsersWorkExpRepository = require('../../../../../../../Domains/program_main/hol/Users/Journey/WorkExperience/HOLUsersWorkExpRepository');

class HOLUsersWorkExpRepositoryMySQL extends HOLUsersWorkExpRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ holUsersId, companyName, startDate, endDate, position }) {
    const query = {
      text: 'INSERT INTO `tx_hol_user_work_experiences` (id_users_hol,company_name,start_date,end_date,position) VALUES (?,?,?,?,?)',
      values: [holUsersId, companyName, startDate, endDate, position],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_user_work_experiences`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_user_work_experiences` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_user_work_experiences` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_user_work_experiences` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersWorkExpRepositoryMySQL;
