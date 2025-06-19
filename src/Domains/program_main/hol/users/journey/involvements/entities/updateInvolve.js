/* eslint-disable camelcase */
class UpdateInvolve {
  constructor(payload) {
    this._verifyPayload(payload);
    const { holUsersEventsId, holUsersId } = payload;
    this.id_users_hol = holUsersId;
    this.id_users_events = holUsersEventsId;
  }
  _verifyPayload({ holUsersId, holUsersEventsId }) {
    if (!holUsersId || !holUsersEventsId) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = UpdateInvolve;
