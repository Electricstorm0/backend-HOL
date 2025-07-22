/* eslint-disable camelcase */
class GetAchieve {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, id_users_hol, events_name, events_year, bcf_contribution, achievements } = payload;
    this.achievementId = id;
    this.usersId = id_users_hol;
    this.eventsName = events_name;
    this.eventsYear = events_year;
    this.bcfContribution = bcf_contribution;
    this.achievements = achievements;
  }
  _verifyPayload({ id_users_hol, events_name, events_year, bcf_contribution, achievements }) {
    if (!id_users_hol || !events_name || !events_year || !bcf_contribution || !achievements) {
      throw new Error('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id_users_hol !== 'number' || typeof events_name !== 'string' || typeof events_year !== 'number' || typeof bcf_contribution !== 'string' || typeof achievements !== 'string') {
      throw new Error('GET_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetAchieve;
