const GetUsers = require('../../../../../Domains/program_main/hol/users/entities/HolGetUsers');

class HOLGetUsersUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute() {
    try {
      const users = await this._HOLUsersRepository.read();
      const result = await Promise.all(
        users.map(async (value) => ({
          ...new GetUsers({
            ...value,
          }),
        }))
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetUsersUseCase;
