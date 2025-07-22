const HOLUsersInvolvementsRepository = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/HOLUsersInvolvementsRepository');

class HOLUsersInvolvementsRepositoryMySQL extends HOLUsersInvolvementsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ usersEventsHOLId, usersId }) {
    const query = {
      text: 'INSERT INTO `tx_hol_involvements` (id_users_events,id_users_hol) VALUES (?,?)',
      values: [usersEventsHOLId, usersId],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_involvements`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ usersHOLId }) {
    const query = {
      text: `SELECT 
  ue.id AS usersEventsId,
  e.name AS Event,
  ha.name AS HOLsArea,
  COALESCE(YEAR(ed.event_date), YEAR(edb.event_date)) AS Year,
  COALESCE(ed.position, edb.position_category) AS Involvements
FROM tx_hol_involvements AS inv
JOIN tx_hol_users_events AS ue ON ue.id = inv.id_users_events
JOIN tx_hol_events AS e ON e.id = ue.id_events_hol
LEFT JOIN tx_hol_events_iysf AS ed ON e.id = ed.id_events_hol
LEFT JOIN tx_hol_events_ba AS edb ON e.id = edb.id_events_hol
LEFT JOIN master_hol_events_type AS et ON et.id = e.id_hol_events_type
LEFT JOIN master_hol_area AS ha ON ha.id = et.id_hol_area
WHERE inv.id_users_hol = ?;
`,
      values: [usersHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readByUsersEventsId({ usersEventsHOLId }) {
    const query = {
      text: 'SELECT 1 FROM `tx_hol_involvements` WHERE id_users_events=?',
      values: [usersEventsHOLId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result.length > 0;
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_involvements` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_involvements` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersInvolvementsRepositoryMySQL;
