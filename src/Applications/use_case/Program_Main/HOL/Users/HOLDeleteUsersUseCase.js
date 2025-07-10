class HOLDeleteUsersUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute({ id }) {
    const users = await this._HOLUsersRepository.delete({ id });
    return users;
  }
}
module.exports = HOLDeleteUsersUseCase;
