class HOLGetTotalUsersByProgramUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute() {
    try {
      const totalUsers = await this._HOLUsersRepository.readCountUsersByProgram();

      return totalUsers;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetTotalUsersByProgramUseCase;
