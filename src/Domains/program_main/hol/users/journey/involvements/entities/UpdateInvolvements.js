/* eslint-disable camelcase */
class UpdateInvolve {
  constructor(payload) {
    this._verifyPayload(payload);
    const { holUsersId, holUsersEventsId } = payload;
    this.id_users_events = holUsersEventsId;
    this.id_users_hol = holUsersId;
  }
  _verifyPayload({ holUsersEventsId }) {
    if (!holUsersEventsId) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = UpdateInvolve;
