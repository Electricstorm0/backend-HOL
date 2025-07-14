class HOLCreateUsersWorkExpUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute(payload) {
    const { holUsersId, companyName, startDate, endDate, position } = payload;

    const userExp = await this._holUsersWorkExpRepository.create({
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
