const MasterBatchRepository = require('../../../Domains/batch/MasterBatchRepository');

class MasterBatchRepositoryMySQL
  extends MasterBatchRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    thirdTierProgramId, batch, startDate, endDate, statusOffered,
  }) {
    const query = {
      text: 'INSERT INTO `master_batch` (id_third_tier_program, batch, date_start, date_end, status_offered_program) VALUES (?, ?, ?, ?, ?)',
      values: [thirdTierProgramId, batch, startDate, endDate, statusOffered],
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
      text: 'SELECT * FROM `master_batch`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_batch` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async verifyCurrentlyActiveById({ id }) {
    const query = {
      text: 'SELECT status_offered_program AS status FROM `master_batch` WHERE id = ? AND status_offered_program = ?',
      values: [id, 1],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result.length !== 0 ?? result[0].status;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_batch` SET ? WHERE `id` = ?',
      values: [payload, id],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_batch` WHERE `id` = ?',
      values: [id],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }
}

module.exports = MasterBatchRepositoryMySQL;
