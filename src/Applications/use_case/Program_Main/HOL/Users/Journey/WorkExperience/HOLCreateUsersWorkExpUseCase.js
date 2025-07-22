class HOLCreateUsersWorkExpUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute({ id: usersId }, payload) {
    const { companyName, startDate, endDate, position } = payload;

    await this._holUsersWorkExpRepository.create({
      usersId,
      companyName,
      startDate,
      endDate,
      position,
    });
  }
}
module.exports = HOLCreateUsersWorkExpUseCase;
