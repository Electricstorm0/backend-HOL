/* eslint-disable camelcase */
class updateIYSF {
  constructor(payload) {
    this._verifyPayload(payload);
    const { position, positionCategory, eventDate, requirement } = payload;
    this.position = position;
    this.position_category = positionCategory;
    this.requirements = requirement;
    this.event_date = eventDate;
  }
  _verifyPayload({ position, positionCategory }) {
    if (!position || !positionCategory) {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateIYSF;
