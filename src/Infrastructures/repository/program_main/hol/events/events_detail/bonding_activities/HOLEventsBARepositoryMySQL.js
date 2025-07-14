const HOLEventsBARepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/HOLEventsBARepository');

class HOLEventsBARepositoryMySQL extends HOLEventsBARepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ holEventsId, pictureUrl, category }) {
    const query = {
      text: 'INSERT INTO `tx_hol_events_ba` ( id_events_hol ,picture_url ,category ) VALUES (?, ?, ?)',
      values: [holEventsId, pictureUrl, category],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }

  async read({ skip, numPerPage, holEventsTypeId }) {
    const query = {
      text: `SELECT e.id_hol_events_type, e.name, e.deadline, e.duration, e.description, e.benefit, e.contact_person,e.id_regencies, 
      eb.picture_url, eb.category 
      FROM tx_hol_events AS e 
      JOIN tx_hol_events_ba AS eb ON eb.id_events_hol = e.id 
      WHERE e.id_hol_events_type=? 
      ORDER BY e.id ASC LIMIT ?,?`,
      values: [holEventsTypeId, skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: `SELECT e.id_hol_events_type, e.name, e.deadline, e.duration, e.description, e.benefit, e.contact_person,e.id_regencies, 
      eb.picture_url, eb.category 
      FROM tx_hol_events AS e 
      JOIN tx_hol_events_ba AS eb ON eb.id_events_hol = e.id 
      where e.id=?`,
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }
  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_events_ba` SET ? WHERE id_events_hol = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_events_ba` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}
module.exports = HOLEventsBARepositoryMySQL;
