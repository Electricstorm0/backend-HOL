const HOLEventsCFFRepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/HOLEventsCFFRepository');

class HOLEventsCFFRepositoryMySQL extends HOLEventsCFFRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ holEventsId, position, category, placements, registerUrl, requirements }) {
    const query = {
      text: `INSERT INTO tx_hol_events_cff ( id_events_hol ,position , category ,placements , register_url ,requirements )
       VALUES ( ?, ?, ?, ?, ?, ?)`,
      values: [holEventsId, position, category, placements, registerUrl, requirements],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }

  async read({ skip, numPerPage, holEventsTypeId }) {
    const query = {
      text: `SELECT ec.id_events_hol,e.id_hol_events_type,e.picture_url, e.name, e.deadline, e.duration, e.description, e.benefit, e.contact_person,e.id_regencies, 
       ec.position, ec.category, ec.register_url, ec.requirements, ec.placements 
      FROM tx_hol_events AS e 
      JOIN tx_hol_events_cff AS ec ON ec.id_events_hol = e.id 
      WHERE e.id_hol_events_type=? 
      ORDER BY e.id ASC LIMIT ?,?`,
      values: [holEventsTypeId, skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: `SELECT ec.id_events_hol,e.id_hol_events_type,e.picture_url, e.name, e.deadline, e.duration, e.description, e.benefit, e.contact_person,e.id_regencies, 
       ec.position, ec.category, ec.register_url, ec.requirements, ec.placements 
      FROM tx_hol_events AS e 
      JOIN tx_hol_events_cff AS ec ON ec.id_events_hol = e.id 
      Where e.id=?`,
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_events_cff` SET ? WHERE id_events_hol= ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_events_cff` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}
module.exports = HOLEventsCFFRepositoryMySQL;
