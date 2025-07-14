const HOLEventsRepository = require('../../../../../Domains/program_main/hol/events/HOLEventsRepository');

class HOLEventsRepositoryMySQL extends HOLEventsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountByProgramType({ holEventsTypeId }) {
    const query = {
      text: 'SELECT COUNT(*) AS Total_Program FROM `tx_hol_events` where id_hol_events_type=? ',
      values: [holEventsTypeId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async create({ holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person }) {
    const query = {
      text: `INSERT INTO tx_hol_events (id_hol_events_type  ,name, deadline ,duration ,id_regencies ,description ,benefit 
      ,contact_person) VALUES (?, ?, ?, ?, ?,?,?,?)`,
      values: [holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_events`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_events` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readEventsTypeAndPositionByEventsId({ eventsHOLId }) {
    const query = {
      text: `SELECT e.id_hol_events_type, COALESCE(eba.position_category,ei.position_category) as position 
      FROM tx_hol_events as e 
      LEFT JOIN tx_hol_events_ba as eba on eba.id_events_hol = e.id
      LEFT JOIN tx_hol_events_iysf as ei on ei.id_events_hol = e.id 
      WHERE e.id = ? `,
      values: [eventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_events` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_events` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}
module.exports = HOLEventsRepositoryMySQL;
