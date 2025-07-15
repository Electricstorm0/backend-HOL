/* eslint-disable camelcase */
class UpdateExp {
  constructor(payload) {
    this._verifyPayload(payload);
    const { companyName, startDate, endDate, position } = payload;
    this.company_name = companyName;
    this.start_date = startDate;
    this.end_date = endDate;
    this.position = position;
  }
  _verifyPayload({ companyName, startDate, endDate, position }) {
    if (!companyName || !startDate || !endDate || !position) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = UpdateExp;
