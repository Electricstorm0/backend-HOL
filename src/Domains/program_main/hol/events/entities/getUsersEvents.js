/* eslint-disable camelcase */
class GetUsersEvents {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id_users_hol, id_events_hol, attendance, status } = payload;
    this.usersHolId = id_users_hol;
    this.eventsHolId = id_events_hol;
    this.attendance = attendance;
    this.status = status;
  }
  _verifyPayload({ id_users_hol, id_events_hol }) {
    if (!id_users_hol || !id_events_hol) {
      throw new Error('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id_users_hol !== 'number' || typeof id_events_hol !== 'number') {
      throw new Error('GET_USERS_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetUsersEvents;
