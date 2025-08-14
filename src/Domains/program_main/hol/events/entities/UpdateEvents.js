/* eslint-disable camelcase */
class updateEvents {
  constructor(payload) {
    this._verifyPayload(payload);
    const { pictureUrl, name, deadline, duration, regenciesId, description, benefit, contact_person } = payload;
    this.picture_url = pictureUrl;
    this.name = name;
    this.id_regencies = regenciesId;
    this.deadline = new Date(deadline);
    this.duration = duration;
    this.description = description;
    this.benefit = benefit;
    this.contact_person = contact_person;
  }
  _verifyPayload({ pictureUrl, name, deadline, duration, description, benefit, contact_person }) {
    if (!pictureUrl || !name || !deadline || !duration || !description || !benefit || !contact_person) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof pictureUrl !== 'string' || typeof name !== 'string' || isNaN(Date.parse(deadline)) || typeof duration !== 'string' || typeof description !== 'string' || typeof benefit !== 'string' || typeof contact_person !== 'string') {
      throw new Error('UPDATE_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = updateEvents;
