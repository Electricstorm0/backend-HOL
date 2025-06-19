/* eslint-disable camelcase */
class CLPGetEvaluationsPATHasEvaluatedUsers {
  constructor(payload) {
    const {
      usersClPId, first_name, last_name, hasEvaluated,
    } = payload;

    this.usersClPId = usersClPId;
    this.firstName = first_name;
    this.lastName = last_name;
    this.hasEvaluated = hasEvaluated;
  }
}

module.exports = CLPGetEvaluationsPATHasEvaluatedUsers;
