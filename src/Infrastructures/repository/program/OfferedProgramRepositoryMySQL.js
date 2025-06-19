const OfferedProgramRepository = require('../../../Domains/program/OfferedProgramRepository');

class OfferedProgramRepositoryMySQL extends OfferedProgramRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    usersId, statusAcceptanceProgramId, roleId, thirdTierProgramId, batchId,
  }) {
    const query = {
      text: 'INSERT INTO `tx_offered_program` (id_users,id_status_acceptance_program,id_role,id_third_tier_program,id_batch) VALUES (?,?,?,?,?)',
      values: [usersId, statusAcceptanceProgramId, roleId, thirdTierProgramId, batchId],
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
      text: ' SELECT * FROM `tx_offered_program`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_offered_program` WHERE id = ?',
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
      text: 'SELECT * FROM `tx_offered_program` WHERE id_users = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async readByRoleId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_offered_program` WHERE id_role = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }

  async readByThirdTierProgramId({ id }) {
    const query = {
      text: ' SELECT * FROM `tx_offered_program` WHERE id_third_tier_program = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }

  async readyByBatchAndUsersId({ batchId, usersId }) {
    const query = {
      text: 'SELECT * FROM `tx_offered_program` WHERE id_batch = ? AND id_users = ?',
      values: [batchId, usersId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_offered_program` SET ? WHERE `id` = ?',
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
      text: 'DELETE FORM `tx_offered_program ` WHERE `id` = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = OfferedProgramRepositoryMySQL;
