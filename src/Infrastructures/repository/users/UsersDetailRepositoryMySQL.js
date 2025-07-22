const UsersDetailRepository = require('../../../Domains/users/UsersDetailRepository');

class UsersDetailRepositoryMySQL extends UsersDetailRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ usersId, cardIdNumber, firstName, lastName, sex, phoneNumber, birthDate, emergencyPhoneNumber, relationshipEmergencyPhoneNumber, instagram, tiktok, linkedin, bankAccountNumber, bankAccountName, bankName }) {
    const query = {
      text: 'INSERT INTO `tx_users_detail`  (id,id_card_number,first_name,last_name,sex,phone_number,birth_date,emergency_phone_number,relationship_emergency_phone_number,socmed_instagram,socmed_tiktok,socmed_linkedin,bank_account_number,bank_account_name,bank_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',
      values: [usersId, cardIdNumber, firstName, lastName, sex, phoneNumber, birthDate, emergencyPhoneNumber, relationshipEmergencyPhoneNumber, instagram, tiktok, linkedin, bankAccountNumber, bankAccountName, bankName],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return {
      id: result.insertId,
    };
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `tx_users_detail` ',
    };

    const [result] = await this._pool.query(query.text);

    return result;
  }

  async update({ payload, id }) {
    const query = {
      text: 'UPDATE `tx_users_detail` SET ? WHERE id = ?',
      values: [payload, id],
    };

    await this._pool.query(query.text, query.values);
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT *, DATE_FORMAT(`birth_date`,"%Y-%m-%d") AS birth_date FROM `tx_users_detail` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result[0];
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_users_detail` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = UsersDetailRepositoryMySQL;
