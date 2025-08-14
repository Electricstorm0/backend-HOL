const HOLUsersEventsRepository = require('../../../../../Domains/program_main/hol/events/HOLUsersEventsRepository');

class HOLUsersEventsRepositoryMySQL extends HOLUsersEventsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountUsersEventsByEventsId({ eventsHOLId }) {
    const query = {
      text: `
      WITH ranked AS (
        SELECT 
            ue.id_users_hol,
            ROW_NUMBER() OVER (
              PARTITION BY ue.id_users_hol 
              ORDER BY b.batch DESC
            ) AS rn
        FROM tx_hol_events AS e
        JOIN tx_hol_users_events AS ue ON ue.id_events_hol = e.id
        JOIN tx_users AS u ON u.id = ue.id_users_hol
        JOIN tx_hol_users AS hu ON hu.id_users = u.id
        JOIN master_batch AS b ON b.id = hu.id_batch
        WHERE e.id = ?
      )
      SELECT COUNT(*) AS total_users_registrations
      FROM ranked
      WHERE rn = 1;
    `,
      values: [eventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readCountUsersEventsByEventsTypeId({ holEventsTypeId }) {
    const query = {
      text: `SELECT  COUNT(*) as total_users_registrations FROM tx_hol_users_events as ue 
      JOIN tx_hol_events as e on e.id = ue.id_events_hol 
      WHERE e.id_hol_events_type = ?`,
      values: [holEventsTypeId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readCountUsersEventsByEventsIdAndStatus({ eventsHOLId, status }) {
    const query = {
      text: '  SELECT  COUNT(*) as total_users_registrations FROM tx_hol_users_events WHERE id_events_hol = ? AND status=? ',
      values: [eventsHOLId, status],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async readCountUsersEventsGroupByProgram({ eventsHOLId, status }) {
    const query = {
      text: `SELECT msp.name, COUNT(ue.id_users_hol) AS participant 
      FROM master_second_tier_program AS msp 
      LEFT JOIN master_third_tier_program AS mtp ON mtp.id_second_tier_program = msp.id 
      LEFT JOIN tx_offered_program AS op ON op.id_third_tier_program = mtp.id 
      LEFT JOIN tx_hol_users_events AS ue ON ue.id_users_hol = op.id_users AND ue.id_events_hol = ? AND ue.status = ? 
      GROUP BY msp.name `,
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

  async readByUsersId({ usersId }) {
    const query = {
      text: `SELECT ue.status, e.name,e.picture_url,e.deadline,e.duration, r.name as domicile, COALESCE(cff.category,ba.category) as category,cff.placements,COALESCE(ba.event_date,iysf.event_date) as event_date,COALESCE(iysf.position,cff.position) as position
              FROM 
              tx_hol_users_events as ue
              JOIN 
              tx_hol_events as e on e.id = ue.id_events_hol
              LEFT JOIN 
              tx_hol_events_cff as cff on cff.id_events_hol = e.id
              LEFT JOIN 
              tx_hol_events_ba as ba on ba.id_events_hol = e.id
              LEFT JOIN 
              tx_hol_events_iysf as iysf on iysf.id_events_hol = e.id
              LEFT JOIN 
              master_domicile_regencies as r on r.id = e.id_regencies
              WHERE id_users_hol=?`,
      values: [usersId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readByUsersIdAndStatus({ usersId, status }) {
    const query = {
      text: `SELECT ue.status, e.name,e.picture_url,e.deadline,e.duration, r.name as domicile, COALESCE(cff.category,ba.category) as category,cff.placements,COALESCE(ba.event_date,iysf.event_date) as event_date,COALESCE(iysf.position,cff.position) as position
              FROM 
              tx_hol_users_events as ue
              JOIN 
              tx_hol_events as e on e.id = ue.id_events_hol
              LEFT JOIN 
              tx_hol_events_cff as cff on cff.id_events_hol = e.id
              LEFT JOIN 
              tx_hol_events_ba as ba on ba.id_events_hol = e.id
              LEFT JOIN 
              tx_hol_events_iysf as iysf on iysf.id_events_hol = e.id
              LEFT JOIN 
              master_domicile_regencies as r on r.id = e.id_regencies
              WHERE id_users_hol=? AND status="approve"`,
      values: [usersId, status],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }

  async readUsersEventsByEventsId({ skip, numPerPage, eventsHOLId }) {
    const query = {
      text: `WITH ranked AS (
    SELECT 
        ue.*,
        CONCAT(ud.first_name, ' ', ud.last_name) AS Alumni_Name,
        b.batch,
        YEAR(b.date_start) AS Year,
        d.name AS domicile,
        p.name AS program,
        ROW_NUMBER() OVER (PARTITION BY ue.id_users_hol ORDER BY b.batch DESC) AS rn
    FROM tx_hol_events AS e
    JOIN tx_hol_users_events AS ue ON ue.id_events_hol = e.id
    JOIN tx_users_detail AS ud ON ud.id = ue.id_users_hol
    JOIN tx_users AS u ON u.id = ud.id
    JOIN tx_hol_users AS hu ON hu.id_users = u.id
    JOIN master_batch AS b ON b.id = hu.id_batch
    JOIN tx_users_domicile AS udm ON udm.id_users = u.id
    JOIN master_domicile_provincies AS d ON d.id = udm.id_provincies
    JOIN tx_offered_program AS op ON op.id_users = u.id
    JOIN master_third_tier_program AS mtp ON mtp.id = op.id_third_tier_program
    JOIN master_second_tier_program AS p ON p.id = mtp.id_second_tier_program
    WHERE e.id = ?
    )
    SELECT *
    FROM ranked
    WHERE rn = 1
    ORDER BY batch DESC 
   LIMIT ?, ?; `,
      values: [eventsHOLId, skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }

  async readByUsersIdAndAttendance({ usersHOLId }) {
    const query = {
      text: `SELECT ue.id as usersEventsId, e.name as Event, ha.name AS HOLsArea , COALESCE(YEAR(ed.event_date),YEAR(edb.event_date)) AS Year,
      COALESCE( ed.position, edb.position_category) AS Involvements
       FROM tx_hol_users_events AS ue 
       LEFT JOIN tx_hol_events AS e ON e.id = ue.id_events_hol 
       LEFT JOIN tx_hol_events_iysf AS ed ON e.id = ed.id_events_hol 
       LEFT JOIN tx_hol_events_ba AS edb ON e.id = edb.id_events_hol 
       LEFT JOIN master_hol_events_type AS et ON et.id = e.id_hol_events_type 
       LEFT JOIN master_hol_area AS ha ON ha.id = et.id_hol_area 
       WHERE ue.id_users_hol=? AND ue.attendance = 1; `,
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
