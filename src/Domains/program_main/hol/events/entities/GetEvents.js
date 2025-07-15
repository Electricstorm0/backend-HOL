/* eslint-disable camelcase */
class GetEvents {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id_hol_events_type, name, deadline, duration, location, description, benefit, contact_person } = payload;
    this.holEventsTypeId = id_hol_events_type;
    this.deadline = deadline;
    this.name = name;
    this.duration = duration;
    this.location = location;
    this.description = description;
    this.benefit = benefit;
    this.contact_person = contact_person;
  }
  _verifyPayload({ name, deadline, duration, location, description, benefit, contact_person }) {
    if (!name || !deadline || !duration || !location || !description || !benefit || !contact_person) {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof name !== 'string' || typeof deadline !== 'number' || typeof duration !== 'string' || typeof location !== 'string' || typeof description !== 'string' || typeof benefit !== 'string' || typeof contact_person !== 'string') {
      throw new Error('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetEvents;
