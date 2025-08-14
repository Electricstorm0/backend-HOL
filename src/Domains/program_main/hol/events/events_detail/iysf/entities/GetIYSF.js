/* eslint-disable camelcase */
class GetIYSF {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id_events_hol, id_hol_events_type, name, deadline, duration, id_regencies, description, benefit, contact_person, picture_url, position, position_category, event_date, requirements } = payload;
    this.iysfId = id_events_hol;
    this.HolEventTypeId = id_hol_events_type;
    this.pictureUrl = picture_url;
    this.name = name;
    this.position = position;
    this.positionCategory = position_category;
    this.regenciesId = id_regencies;
    this.deadline = deadline;
    this.eventDate = event_date;
    this.duration = duration;
    this.description = description;
    this.requirements = requirements;
    this.benefit = benefit;
    this.contact_person = contact_person;
  }
  _verifyPayload({ name, deadline, duration, description, benefit, contact_person, requirements }) {
    if (!name || !deadline || !duration || !description || !benefit || !contact_person || !requirements) {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof name !== 'string' || typeof deadline !== 'object' || typeof duration !== 'string' || typeof description !== 'string' || typeof benefit !== 'string' || typeof contact_person !== 'string' || typeof requirements !== 'string') {
      throw new Error('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetIYSF;
