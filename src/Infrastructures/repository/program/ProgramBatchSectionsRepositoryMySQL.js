const ProgramBatchSectionsRepository = require('../../../Domains/program/ProgramBatchSectionsRepository');

class ProgramBatchSectionsRepositoryMySQL
  extends ProgramBatchSectionsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    batchId, programSectionsId, startDate, endDate,
  }) {
    const query = {
      text: 'INSERT INTO `tx_program_batch_sections` (id_batch, id_program_sections, date_start, date_end) VALUES (?, ?, ?, ?)',
      values: [batchId, programSectionsId, startDate, endDate],
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
      text: 'SELECT * FROM `tx_program_batch_sections`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_program_batch_sections` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readBySectionsId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_program_batch_sections` WHERE `id_program_sections` = ?',
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
      text: 'UPDATE `tx_program_batch_sections` SET ? WHERE `id` = ?',
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
      text: 'DELETE FROM `tx_program_batch_sections` WHERE `id` = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}
module.exports = ProgramBatchSectionsRepositoryMySQL;
