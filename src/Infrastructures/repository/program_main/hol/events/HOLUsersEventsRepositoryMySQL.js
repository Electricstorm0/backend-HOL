const HOLUsersEventsRepository = require('../../../../../Domains/program_main/hol/events/HOLUsersEventsRepository');

class HOLUsersEventsRepositoryMySQL extends HOLUsersEventsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }
  async readCountUsersEventsByEventsTypeId({ holEventsTypeId }) {
    const query = {
      text: 'SELECT  COUNT(*) as total_pendaftar FROM tx_hol_users_events as ue JOIN tx_hol_events as e on e.id = ue.id_events_hol WHERE e.id_hol_events_type = 2',
      values: [holEventsTypeId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readCountUsersEventsByEventsIdAndStatus({ eventsHOLId, status }) {
    const query = {
      text: '  SELECT  COUNT(*) as total_pendaftar FROM tx_hol_users_events WHERE id_events_hol = ? AND status=? ',
      values: [eventsHOLId, status],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readCountUsersEventsGroupByProgram({ eventsHOLId, status }) {
    const query = {
      text: 'SELECT msp.name, COUNT(ue.id_users_hol) AS partisipan FROM master_second_tier_program AS msp LEFT JOIN master_third_tier_program AS mtp ON mtp.id_second_tier_program = msp.id LEFT JOIN tx_offered_program AS op ON op.id_third_tier_program = mtp.id LEFT JOIN tx_hol_users_events AS ue ON ue.id_users_hol = op.id_users AND ue.id_events_hol = ? AND ue.status = ? GROUP BY msp.name; ',
      values: [eventsHOLId, status],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async create({ usersHOLId, eventsHOLId, status }) {
    const query = {
      text: 'INSERT INTO `tx_hol_users_events` (id_users_hol ,id_events_hol, status) VALUES (?, ?,?)',
      values: [usersHOLId, eventsHOLId, status],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_users_events`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_users_events` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readUsersEventsByEventsId({ eventsHOLId }) {
    const query = {
      text: 'SELECT ue.id, ud.first_name, ud.last_name, b.batch, p.name AS program, d.name as domisili, ue.status, ue.attendance FROM tx_hol_events as e JOIN tx_hol_users_events as ue on ue.id_events_hol = e.id JOIN tx_users_detail as ud ON ud.id = ue.id_users_hol JOIN tx_users AS u ON u.id = ud.id JOIN tx_offered_program AS op ON op.id_users = u.id JOIN master_batch AS b ON b.id = op.id_batch JOIN master_third_tier_program AS mtp ON mtp.id = op.id_third_tier_program JOIN master_second_tier_program AS p ON p.id = mtp.id_second_tier_program JOIN tx_users_domicile AS udm ON udm.id_users = u.id JOIN master_domicile_provincies AS d ON d.id = udm.id_provincies WHERE e.id = ? ',
      values: [eventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    console.log(result);

    return result;
  }

  async readByUsersIdAndAttendance({ usersHOLId }) {
    const query = {
      text: 'SELECT ue.id, e.name as Acara, ha.name AS Bidang , COALESCE(YEAR(ed.event_date),YEAR(edb.event_date)) AS Tahun,COALESCE( ed.position, edb.position) AS Keterlibatan FROM tx_hol_users_events AS ue LEFT JOIN tx_hol_events AS e ON e.id = ue.id_events_hol LEFT JOIN tx_hol_events_iysf AS ed ON e.id = ed.id_events_hol LEFT JOIN tx_hol_events_ba AS edb ON e.id = edb.id_events_hol LEFT JOIN master_hol_events_type AS et ON et.id = e.id_hol_events_type LEFT JOIN master_hol_area AS ha ON ha.id = et.id_hol_area WHERE ue.id_users_hol=1 AND ue.attendance = 1; ',
      values: [usersHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async checkRegisteredUsersEvents({ usersHOLId, eventsHOLId }) {
    const query = {
      text: 'SELECT 1 FROM `tx_hol_users_events` WHERE id_users_hol=? AND id_events_hol=? LIMIT 1',
      values: [usersHOLId, eventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result.length > 0;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_users_events` SET ? WHERE id = ?',
      values: [id, payload],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async updateAttendance({ usersHOLId, eventsHOLId }) {
    const query = {
      text: 'UPDATE `tx_hol_users_events` SET attendance = 1 WHERE id_users_hol = ? AND id_events_hol= ?',
      values: [usersHOLId, eventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async updateStatusUsersEvents({ usersHOLId, eventsHOLId }) {
    const query = {
      text: 'UPDATE `tx_hol_users_events` SET status = 1 WHERE id_users_hol = ? AND id_events_hol= ?',
      values: [usersHOLId, eventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_users_events` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}
module.exports = HOLUsersEventsRepositoryMySQL;
