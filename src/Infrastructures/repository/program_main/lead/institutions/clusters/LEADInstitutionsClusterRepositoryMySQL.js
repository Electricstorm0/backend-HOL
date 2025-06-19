const LEADInstitutionsClusterRepository = require('../../../../../../Domains/program_main/lead/institutions/cluster/LEADInstitutionsClusterRepository');

class LEADInstitutionsClusterRepositoryMySQL
  extends
  LEADInstitutionsClusterRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ leadClusterFocusId, leadClusterTypeId }) {
    const query = {
      text: 'INSERT INTO `tx_lead_institutions_cluster` (id_lead_cluster_focus,id_lead_cluster_type) VALUES (?,?)',
      values: [leadClusterFocusId, leadClusterTypeId],
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
      text: 'SELECT * FROM `tx_lead_institutions_cluster`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_lead_institutions_cluster` WHERE id = ?',
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
      text: 'UPDATE `tx_lead_institutions_cluster` SET ? WHERE id=?',
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
      text: 'DELETE FROM `tx_lead_institutions_cluster` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = LEADInstitutionsClusterRepositoryMySQL;
