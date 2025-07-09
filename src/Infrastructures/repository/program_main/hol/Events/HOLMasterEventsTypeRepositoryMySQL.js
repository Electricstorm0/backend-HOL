const HOLMasterEventsTypeRepository = require('../../../../../Domains/program_main/hol/events/HOLMasterEventsTypeRepository');

class HOLMasterEventsTypeRepositoryMySQL extends HOLMasterEventsTypeRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ holAreaId, name }) {
    const query = {
      text: 'INSERT INTO `master_hol_events_type` (id_hol_area, name) VALUES (?, ?)',
      values: [holAreaId, name],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `master_hol_events_type`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_hol_events_type` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_hol_events_type` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_hol_events_type` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}
module.exports = HOLMasterEventsTypeRepositoryMySQL;
