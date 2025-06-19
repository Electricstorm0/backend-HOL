const UsersUniversitiesRepository = require('../../../Domains/users/UsersUniversitiesRepository');

class UsersUniversitiesRepositoryMySQL extends UsersUniversitiesRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    majorUniversitiesId, usersId, batchId, nim, gradePointAverage, statusEntry, educationalLevel,
  }) {
    const query = {
      text: 'INSERT INTO  `tx_users_universities` (id_major_universities, id_users, id_batch, nim, grade_point_average, status_of_entry ,educational_level) VALUES (?,?,?,?,?,?,?) ',
      values: [majorUniversitiesId, usersId, batchId, nim, gradePointAverage, statusEntry, educationalLevel],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return {
      id: result.insertId,
    };
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `tx_users_universities` ',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_users_universities` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result[0];
  }

  async update({ payload, id }) {
    const query = {
      text: 'UPDATE `tx_users_universities` SET ? WHERE id = ?',
      values: [payload, id],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async readByUsersAndBatchId({ usersId, batchId }) {
    const query = {
      text: 'SELECT * FROM `tx_users_universities` WHERE id_users = ? AND id_batch',
      values: [usersId, batchId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByUsersId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_users_universities` WHERE id_users = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_users_universities` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = UsersUniversitiesRepositoryMySQL;
