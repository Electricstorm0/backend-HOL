const HOLEventsIYSFRepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/IYSF/HOLEventsIYSFRepository');

class HOLEventsIYSFRepositoryMySQL extends HOLEventsIYSFRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ holEventsId, logoUrl, position, positionCategory, eventDate, requirements }) {
    const query = {
      text: 'INSERT INTO `tx_hol_events_iysf` ( id_events_hol ,logo_url,position, position_category ,event_date,requirements ) VALUES (?, ?, ?, ?, ?, ?)',
      values: [holEventsId, logoUrl, position, positionCategory, eventDate, requirements],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }

  async read({ skip, numPerPage, holEventsTypeId }) {
    const query = {
      text: 'SELECT e.id_hol_events_type, e.name, e.deadline, e.duration, e.description, e.benefit, e.contact_person,e.id_regencies, ei.logo_url, ei.position, ei.position_category, ei.event_date, ei.requirements FROM tx_hol_events AS e JOIN tx_hol_events_iysf AS ei ON ei.id_events_hol = e.id WHERE e.id_hol_events_type=? ORDER BY e.id ASC LIMIT ?,?',
      values: [holEventsTypeId, skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT e.id_hol_events_type, e.name, e.deadline, e.duration, e.description, e.benefit, e.contact_person,e.id_regencies, ei.logo_url, ei.position, ei.position_category, ei.event_date, ei.requirements FROM tx_hol_events AS e JOIN tx_hol_events_iysf AS ei ON ei.id_events_hol = e.id WHERE e.id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_events_iysf` SET ? WHERE id_events_hol= ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_events_iysf` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}
module.exports = HOLEventsIYSFRepositoryMySQL;
