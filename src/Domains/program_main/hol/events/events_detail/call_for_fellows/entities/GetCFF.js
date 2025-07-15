/* eslint-disable camelcase */
class GetCFF {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id_events_hol, id_hol_events_type, name, deadline, duration, id_regencies, description, benefit, contact_person, logo_url, position, category, placements, register_url, requirements } = payload;
    this.callForFellowsId = id_events_hol;
    this.HolEventTypeId = id_hol_events_type;
    this.logo_url = logo_url;
    this.name = name;
    this.position = position;
    this.category = category;
    this.placements = placements;
    this.regenciesId = id_regencies;
    this.deadline = deadline;
    this.duration = duration;
    this.description = description;
    this.requirements = requirements;
    this.benefit = benefit;
    this.register_url = register_url;
    this.contact_person = contact_person;
  }
  _verifyPayload({ name, deadline, duration, description, benefit, contact_person, logo_url, position, category, placements, register_url, requirements }) {
    if (!name || !deadline || !duration || !description || !benefit || !contact_person || !logo_url || !position || !category || !placements || !register_url || !requirements) {
      throw new Error('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof name !== 'string' ||
      typeof deadline !== 'object' ||
      typeof duration !== 'string' ||
      typeof description !== 'string' ||
      typeof benefit !== 'string' ||
      typeof contact_person !== 'string' ||
      typeof logo_url !== 'string' ||
      typeof position !== 'string' ||
      typeof category !== 'string' ||
      typeof placements !== 'string' ||
      typeof register_url !== 'string' ||
      typeof requirements !== 'string'
    ) {
      throw new Error('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetCFF;
