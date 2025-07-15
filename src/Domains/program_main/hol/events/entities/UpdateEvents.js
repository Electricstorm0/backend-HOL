/* eslint-disable camelcase */
class updateEvents {
  constructor(payload) {
    this._verifyPayload(payload);
    const { name, deadline, duration, regenciesId, description, benefit, contact_person } = payload;
    this.name = name;
    this.id_regencies = regenciesId;
    this.deadline = deadline;
    this.duration = duration;
    this.description = description;
    this.benefit = benefit;
    this.contact_person = contact_person;
  }
  _verifyPayload({ name, deadline, duration, description, benefit, contact_person }) {
    if (!name || !deadline || !duration || !description || !benefit || !contact_person) {
      throw new Error('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateEvents;
