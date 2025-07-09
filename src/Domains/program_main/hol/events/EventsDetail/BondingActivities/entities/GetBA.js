/* eslint-disable camelcase */
class GetBA {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id_hol_events_type, name, deadline, duration, id_regencies, description, benefit, contact_person, picture_url, category } = payload;
    this.holEventTypeId = id_hol_events_type;
    this.pictureUrl = picture_url;
    this.name = name;
    this.category = category;
    this.regenciesId = id_regencies;
    this.deadline = deadline;
    this.duration = duration;
    this.description = description;
    this.benefit = benefit;
    this.contact_person = contact_person;
  }
  _verifyPayload({ name, deadline, duration, description, benefit, contact_person, category }) {
    if (!name || !deadline || !duration || !description || !benefit || !contact_person || !category) {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof name !== 'string' || typeof deadline !== 'object' || typeof duration !== 'string' || typeof description !== 'string' || typeof benefit !== 'string' || typeof contact_person !== 'string' || typeof category !== 'string') {
      throw new Error('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetBA;
