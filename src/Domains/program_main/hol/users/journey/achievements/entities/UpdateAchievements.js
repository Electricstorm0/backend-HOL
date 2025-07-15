/* eslint-disable camelcase */
class updateAchieve {
  constructor(payload) {
    this._verifyPayload(payload);
    const { usersId, eventsName, eventsYear, bcfContribution, achievements } = payload;
    this.id_users_hol = usersId;
    this.events_name = eventsName;
    this.events_year = eventsYear;
    this.bcf_contribution = bcfContribution;
    this.achievements = achievements;
  }
  _verifyPayload({ eventsName, eventsYear, bcfContribution, achievements }) {
    if (!eventsName || !eventsYear || !bcfContribution || !achievements) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateAchieve;
