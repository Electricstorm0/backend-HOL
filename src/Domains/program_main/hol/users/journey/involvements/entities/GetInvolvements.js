/* eslint-disable camelcase */
class GetInvolve {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, id_users_events, id_users_hol } = payload;
    this.involvementId = id;
    this.usersHolId = id_users_hol;
    this.usersEventsId = id_users_events;
  }
  _verifyPayload({ id_users_hol, id_users_events }) {
    if (!id_users_events || !id_users_hol) {
      throw new Error('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id_users_events !== 'number' || typeof id_users_hol !== 'number') {
      throw new Error('GET_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetInvolve;
