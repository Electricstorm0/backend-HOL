const LEADMasterInstitutionsClusterTypeRepository = require('../../../../../../Domains/program_main/lead/institutions/cluster/LEADMasterInstitutionsClusterTypeRepository');

class LEADMasterInstitutionsClusterTypeRepositoryMySQL
  extends LEADMasterInstitutionsClusterTypeRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ name }) {
    const query = {
      text: 'INSERT INTO `master_lead_institutions_cluster_type` (name) VALUES (?)',
      values: [name],
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
      text: 'SELECT * FROM `master_lead_institutions_cluster_type`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_lead_institutions_cluster_type` WHERE id = ?',
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
      text: 'UPDATE `master_lead_institutions_cluster_type` SET ? WHERE id=?',
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
      text: 'DELETE FROM `master_lead_institutions_cluster_type` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = LEADMasterInstitutionsClusterTypeRepositoryMySQL;
