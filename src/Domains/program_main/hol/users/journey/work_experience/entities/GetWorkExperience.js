/* eslint-disable camelcase */
class GetExp {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, id_users_hol, company_name, start_date, end_date, position } = payload;
    this.workExperienceId = id;
    this.holUsersId = id_users_hol;
    this.companyName = company_name;
    this.startDate = start_date;
    this.endDate = end_date;
    this.position = position;
  }
  _verifyPayload({ id_users_hol, company_name, start_date, end_date, position }) {
    if (!id_users_hol || !company_name || !start_date || !end_date || !position) {
      throw new Error('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id_users_hol !== 'number' || typeof company_name !== 'string' || typeof start_date !== 'object' || typeof end_date !== 'object' || typeof position !== 'string') {
      throw new Error('GET_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetExp;
