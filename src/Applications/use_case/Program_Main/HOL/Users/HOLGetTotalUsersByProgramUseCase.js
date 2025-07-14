class HOLGetTotalUsersByProgramUseCase {
  constructor({ holUsersRepository }) {
    this._holUsersRepository = holUsersRepository;
  }

  async execute() {
    const totalUsers = await this._holUsersRepository.readCountUsersByProgram();

    return totalUsers;
  }
}

module.exports = HOLGetTotalUsersByProgramUseCase;
