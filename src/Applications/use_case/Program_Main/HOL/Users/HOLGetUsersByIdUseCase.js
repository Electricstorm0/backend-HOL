const GetUsers = require('../../../../../Domains/program_main/hol/users/entities/HolGetUsers');

class HOLGetUsersByIdUseCase {
  constructor({ holUsersRepository }) {
    this._holUsersRepository = holUsersRepository;
  }

  async execute({ id }) {
    const users = (await this._holUsersRepository.readById({ id })) || {};
    const result = new GetUsers({
      photoProfile: 'profileKu.JPG',
      ...users,
    });

    return result;
  }
}

module.exports = HOLGetUsersByIdUseCase;
