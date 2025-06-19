const CLPMentorsRepository = require('../../../../../Domains/program_main/clp/mentors/CLPMentorsRepository');

class CLPMentorsRepositoryMySQL extends CLPMentorsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create(batchId, usersId, position, skill) {
    const query = {
      text: 'INSERT INTO `tx_clp_mentors` (id_batch, id_users, position, skill) VALUES (?,?,?,?)',
      values: [batchId, usersId, position, skill],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return {
      id: result.insertId,
    };
  }

  async readCount({ batchId }) {
    const query = {
      text: 'SELECT COUNT(*) as numRows FROM `tx_clp_mentors` WHERE id_batch = ?',
      values: [batchId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0].numRows;
  }

  async read({ skip, numPerPage, batchId }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_mentors` WHERE id_batch = ? ORDER BY id ASC LIMIT ?, ?',
      values: [batchId, skip, numPerPage],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_mentors` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByUsersId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_mentors` WHERE id_users = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_clp_mentors` SET ? WHERE id = ?',
      values: [id, payload],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_clp_mentors` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPMentorsRepositoryMySQL;
