/* eslint-disable camelcase */
class updateBA {
  constructor(payload) {
    this._verifyPayload(payload);
    const { category } = payload;
    this.category = category;
  }
  _verifyPayload({ category }) {
    if (!category) {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateBA;
