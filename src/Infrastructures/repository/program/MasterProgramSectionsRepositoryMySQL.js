const MasterProgramSectionsRepository = require('../../../Domains/program/MasterProgramSectionsRepository');

class MasterProgramSectionsRepositoryMySQL
  extends MasterProgramSectionsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    thirdTierProgramId, title, descriptions, sequence,
  }) {
    const query = {
      text: 'INSERT INTO `master_program_sections` (id_third_tier_program, title, descriptions, sequence) VALUES (?, ?, ?, ?)',
      values: [thirdTierProgramId, title, descriptions, sequence],
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
      text: 'SELECT * FROM `master_program_sections`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_program_sections` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByThirdTierProgramId({ id }) {
    const query = {
      text: 'SELECT * FROM `master_program_sections` WHERE `id_third_tier_program` = ?',
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
      text: 'UPDATE `master_program_sections` SET ? WHERE `id` = ?',
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
      text: 'DELETE FROM `master_program_sections` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}
module.exports = MasterProgramSectionsRepositoryMySQL;
