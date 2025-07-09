/* eslint-disable camelcase */
class UpdateExp {
  constructor(payload) {
    this._verifyPayload(payload);
    const { holUsersId, companyName, startDate, endDate, position } = payload;
    (this.id_users_hol = holUsersId), (this.company_name = companyName), (this.start_date = startDate), (this.end_date = endDate), (this.position = position);
  }
  _verifyPayload({ holUsersId, companyName, startDate, endDate, position }) {
    if (!holUsersId || !companyName || !startDate || !endDate || !position) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = UpdateExp;
