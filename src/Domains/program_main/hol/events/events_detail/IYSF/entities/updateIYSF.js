/* eslint-disable camelcase */
class updateIYSF {
  constructor(payload) {
    this._verifyPayload(payload);
    const { logoUrl, position, positionCategory, eventDate, requirement } = payload;
    this.logo_url = logoUrl;
    this.position = position;
    this.position_category = positionCategory;
    this.requirements = requirement;
    this.event_date = eventDate;
  }
  _verifyPayload({ logoUrl, position, positionCategory }) {
    if (!position || !positionCategory || !logoUrl) {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateIYSF;
