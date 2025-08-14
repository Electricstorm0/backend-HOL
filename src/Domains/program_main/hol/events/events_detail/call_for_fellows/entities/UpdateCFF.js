/* eslint-disable camelcase */
class updateCFF {
  constructor(payload) {
    this._verifyPayload(payload);
    const { position, category, placements, register_url, requirements } = payload;
    this.position = position;
    this.category = category;
    this.placements = placements;
    this.requirements = requirements;
    this.register_url = register_url;
  }
  _verifyPayload({ position, category, placements, requirements }) {
    if (!position || !category || !placements || !requirements) {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateCFF;
