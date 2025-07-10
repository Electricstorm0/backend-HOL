/* eslint-disable camelcase */
class updateAchieve {
  constructor(payload) {
    this._verifyPayload(payload);
    const { holUsersId, eventsName, eventsYear, bcfContribution, achievements } = payload;
    (this.id_users_hol = holUsersId), (this.events_name = eventsName), (this.events_year = eventsYear), (this.bcf_contribution = bcfContribution), (this.achievements = achievements);
  }
  _verifyPayload({ holUsersId, eventsName, eventsYear, bcfContribution, achievements }) {
    if (!holUsersId || !eventsName || !eventsYear || !bcfContribution || !achievements) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}
module.exports = updateAchieve;
