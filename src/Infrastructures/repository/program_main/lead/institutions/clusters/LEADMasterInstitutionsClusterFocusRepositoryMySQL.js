const LEADMasterInstitutionsClusterFocusRepository = require('../../../../../../Domains/program_main/lead/institutions/cluster/LEADMasterInstitutionsClusterFocusRepository');

class LEADMasterInstitutionsClusterFocusRepositoryMySQL
  extends
  LEADMasterInstitutionsClusterFocusRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ leadClusterTypeId, name }) {
    const query = {
      text: 'INSERT INTO `master_lead_institutions_cluster_focus` (id_lead_cluster_type,name) VALUES (?,?)',
      values: [leadClusterTypeId, name],
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
      text: 'SELECT * FROM `master_lead_institutions_cluster_focus`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_lead_institutions_cluster_focus` WHERE id = ?',
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
      text: 'UPDATE `master_lead_institutions_cluster_focus` SET ? WHERE id=?',
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
      text: 'DELETE FROM `master_lead_institutions_cluster_focus` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = LEADMasterInstitutionsClusterFocusRepositoryMySQL;
