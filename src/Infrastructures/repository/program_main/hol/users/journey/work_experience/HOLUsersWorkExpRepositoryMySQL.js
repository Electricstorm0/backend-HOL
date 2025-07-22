const HOLUsersWorkExpRepository = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/HOLUsersWorkExpRepository');

class HOLUsersWorkExpRepositoryMySQL extends HOLUsersWorkExpRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ usersId, companyName, startDate, endDate, position }) {
    const query = {
      text: 'INSERT INTO `tx_hol_user_work_experiences` (id_users_hol,company_name,start_date,end_date,position) VALUES (?,?,?,?,?)',
      values: [usersId, companyName, startDate, endDate, position],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }
  async readByUsersId({ usersHOLId }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_user_work_experiences` WHERE id_users_hol =?',
      values: [usersHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
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
