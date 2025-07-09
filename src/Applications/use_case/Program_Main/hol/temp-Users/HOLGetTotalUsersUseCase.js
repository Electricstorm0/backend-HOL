class HOLGetTotalUsersUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute() {
    try {
      const totalUsers = await this._HOLUsersRepository.readCountUsers();

      return totalUsers;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetTotalUsersUseCase;
