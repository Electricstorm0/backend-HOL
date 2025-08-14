/* eslint-disable camelcase */
class GetUsersEventActivity {
  constructor(payload) {
    this._verifyPayload(payload);
    const { name, deadline, duration, domicile, picture_url, category, position, event_date, status } = payload;
    this.pictureUrl = picture_url;
    this.name = name;
    this.category = category;
    this.deadline = deadline;
    this.duration = duration;
    this.domicile = domicile;
    this.eventDate = event_date;
    this.position = position;
    this.status = status;
  }
  _verifyPayload({ name, deadline, duration, domicile, picture_url }) {
    if (!name || !deadline || !duration || !domicile || !picture_url) {
      throw new Error('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof name !== 'string' || typeof deadline !== 'object' || typeof domicile !== 'string' || typeof picture_url !== 'string') {
      throw new Error('GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetUsersEventActivity;
