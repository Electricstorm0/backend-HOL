/* eslint-disable camelcase */
class UpdateInvolve {
  constructor(payload) {
    this._verifyPayload(payload);
    const { usersId, holUsersEventsId } = payload;
    this.id_users_events = holUsersEventsId;
    this.id_users_hol = usersId;
  }
  _verifyPayload({ holUsersEventsId }) {
    if (!holUsersEventsId) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = UpdateInvolve;
