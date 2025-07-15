class HOLCreateUsersWorkExpUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute({ id: holUsersId }, payload) {
    const { companyName, startDate, endDate, position } = payload;

    await this._holUsersWorkExpRepository.create({
      holUsersId,
      companyName,
      startDate,
      endDate,
      position,
    });
  }
}
module.exports = HOLCreateUsersWorkExpUseCase;
