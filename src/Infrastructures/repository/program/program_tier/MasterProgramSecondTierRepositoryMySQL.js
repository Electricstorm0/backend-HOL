const MasterProgramSecondTierRepository = require('../../../../Domains/program/program_tier/MasterProgramSecondTierRepository');

class MasterProgramSecondTierRepositoryMySQL
  extends MasterProgramSecondTierRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    firstTierProgramId, programName,
  }) {
    const query = {
      text: 'INSERT INTO `master_second_tier_program` (id_first_tier_program, name) VALUES (?, ?)',
      values: [firstTierProgramId, programName],
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
      text: 'SELECT * FROM `master_second_tier_program`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_second_tier_program` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByFirstProgramId({ id }) {
    const query = {
      text: 'SELECT * FROM `master_second_tier_program` WHERE `id_first_tier_program` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_second_tier_program` SET ? WHERE `id` = ?',
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
      text: 'DELETE FROM `master_second_tier_program` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}
module.exports = MasterProgramSecondTierRepositoryMySQL;
