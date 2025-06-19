const MasterProgramRoleRepository = require('../../../Domains/program/MasterProgramRoleRepository');

class MasterProgramRoleRepositoryMySQL
  extends MasterProgramRoleRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ role }) {
    const query = {
      text: 'INSERT INTO `master_role_program` (role) VALUES (?)',
      values: [role],
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
      text: 'SELECT * FROM `master_role_program`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_role_program` WHERE id = ?',
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
      text: 'UPDATE `aster_role_program ` SET ? WHERE `id` = ?',
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
      text: 'DELETE FROM  `master_role_program` WHERE `id`=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = MasterProgramRoleRepositoryMySQL;
