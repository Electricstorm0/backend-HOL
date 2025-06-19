/* eslint-disable camelcase */
class updateBA {
  constructor(payload) {
    this._verifyPayload(payload);
    const { pictureUrl, category } = payload;
    this.picture_url = pictureUrl;
    this.category = category;
  }
  _verifyPayload({ pictureUrl, category }) {
    if (!pictureUrl || !category) {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateBA;
