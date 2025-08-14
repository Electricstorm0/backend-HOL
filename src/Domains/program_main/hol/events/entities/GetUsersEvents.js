/* eslint-disable camelcase */
class GetUsersEvents {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id_users_hol, id_events_hol, Alumni_Name, Program, batch, Year, domicile, attendance, status } = payload;
    this.usersId = id_users_hol;
    this.eventsHolId = id_events_hol;
    this.alumniName = Alumni_Name;
    this.program = Program;
    this.batch = batch;
    this.year = Year;
    this.domicile = domicile;
    this.attendance = attendance;
    this.status = status;
  }
  _verifyPayload({ id_events_hol }) {
    if (!id_events_hol) {
      throw new Error('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id_events_hol !== 'number') {
      throw new Error('GET_USERS_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetUsersEvents;
