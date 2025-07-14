class HOLDeleteUsersUseCase {
  constructor({ holUsersRepository }) {
    this._holUsersRepository = holUsersRepository;
  }

  async execute({ id }) {
    const users = await this._holUsersRepository.delete({ id });
    return users;
  }
}
module.exports = HOLDeleteUsersUseCase;
