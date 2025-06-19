class HOLCreateUsersWorkExpUseCase {
  constructor({ HOLUsersWorkExpRepository }) {
    this._HOLUsersWorkExpRepository = HOLUsersWorkExpRepository;
  }

  async execute(payload) {
    const { holUsersId, companyName, startDate, endDate, position } = payload;

    const userExp = await this._HOLUsersWorkExpRepository.create({
      holUsersId,
      companyName,
      startDate,
      endDate,
      position,
    });
    return userExp;
  }
}
module.exports = HOLCreateUsersWorkExpUseCase;
