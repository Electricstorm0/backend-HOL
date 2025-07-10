class HOLGetTotalUsersByProgramUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute() {
    const totalUsers = await this._HOLUsersRepository.readCountUsersByProgram();

    return totalUsers;
  }
}

module.exports = HOLGetTotalUsersByProgramUseCase;
