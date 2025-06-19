class LEADGetUsersUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUser(params) {
    const { id: userId } = params;

    // Example
    const numRows = await this._userRepository.getCountUsers();

    return numRows;
  }
}

module.exports = LEADGetUsersUseCase;
