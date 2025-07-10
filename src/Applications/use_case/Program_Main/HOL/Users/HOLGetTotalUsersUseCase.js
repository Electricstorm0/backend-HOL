class HOLGetTotalUsersUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute() {
    const totalUsers = await this._HOLUsersRepository.readCountUsers();

    return totalUsers;
  }
}

module.exports = HOLGetTotalUsersUseCase;
