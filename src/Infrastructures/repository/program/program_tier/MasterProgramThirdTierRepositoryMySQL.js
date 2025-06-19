const MasterProgramThirdTierRepository = require('../../../../Domains/program/program_tier/MasterProgramThirdTierRepository');

class MasterProgramThirdTierRepositoryMySQL extends MasterProgramThirdTierRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ secondTierProgramId, programName, descriptions }) {
    const query = {
      text: 'INSERT INTO `master_third_tier_program` (id_second_tier_program, name, descriptions) VALUES (?, ?, ?)',
      values: [secondTierProgramId, programName, descriptions],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return {
      id: result.insertId,
    };
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `master_third_tier_program `',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_third_tier_program` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result[0];
  }

  async readSecProgramNameByThirdProgramId({ id }) {
    const query = {
      text: 'SELECT sp.name FROM master_second_tier_program AS sp JOIN master_third_tier_program AS tp ON tp.id_second_tier_program = sp.id WHERE tp.id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);

    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_third_tier_program` SET ? WHERE `id` = ?',
      values: [payload, id],
    };

    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_third_tier_program` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = MasterProgramThirdTierRepositoryMySQL;
