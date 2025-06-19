class HOLDeleteUsersWorkExpUseCase {
  constructor({ HOLUsersWorkExpRepository }) {
    this._HOLUsersWorkExpRepository = HOLUsersWorkExpRepository;
  }

  async execute({ id }) {
    const exp = await this._HOLUsersWorkExpRepository.delete({ id });
    return exp;
  }
}
module.exports = HOLDeleteUsersWorkExpUseCase;
