const MasterProgramFirstTierRepository = require('../../../../Domains/program/program_tier/MasterProgramFirstTierRepository');

class MasterProgramFirstTierRepositoryMySQL
  extends MasterProgramFirstTierRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    usersBCFId, programName, description, status,
  }) {
    const query = {
      text: 'INSERT INTO `master_first_tier_program` (id_bcf, id_users_bcf, name, description, status) VALUES (?, ?, ?, ?, ?)',
      values: [1, usersBCFId, programName, description, status],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return {
      id: result.insertId,
      usersBCFId,
      programName,
      description,
      status,
    };
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `master_first_tier_program`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_first_tier_program` WHERE `id` = ?',
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
      text: 'UPDATE `master_first_tier_program` SET ? WHERE `id` = ?',
      values: [payload, id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_first_tier_program` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = MasterProgramFirstTierRepositoryMySQL;
