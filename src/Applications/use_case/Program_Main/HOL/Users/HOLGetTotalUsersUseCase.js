class HOLGetTotalUsersUseCase {
  constructor({ holUsersRepository }) {
    this._holUsersRepository = holUsersRepository;
  }

  async execute() {
    const totalUsers = await this._holUsersRepository.readCountUsers();

    return totalUsers;
  }
}

module.exports = HOLGetTotalUsersUseCase;
