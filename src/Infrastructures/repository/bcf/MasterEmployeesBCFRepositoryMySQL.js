const MasterEmployeesBCFRepository = require('../../../Domains/bcf/MasterEmployeesBCFRepository');

class MasterEmployeesBCFRepositoryMySQL
  extends MasterEmployeesBCFRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_employees_bcf` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }
}

module.exports = MasterEmployeesBCFRepositoryMySQL;
