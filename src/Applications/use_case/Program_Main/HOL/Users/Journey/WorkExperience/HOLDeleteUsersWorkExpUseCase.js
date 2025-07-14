class HOLDeleteUsersWorkExpUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute({ id }) {
    const exp = await this._holUsersWorkExpRepository.delete({ id });
    return exp;
  }
}
module.exports = HOLDeleteUsersWorkExpUseCase;
