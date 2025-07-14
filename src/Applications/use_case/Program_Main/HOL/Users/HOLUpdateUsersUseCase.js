const updateUsers = require('../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsers');

class UpdateUsersUseCase {
  constructor({ holUsersRepository }) {
    this._holUsersRepository = holUsersRepository;
  }

  async execute({ id }, payload) {
    const updateUser = new updateUsers(payload);
    await this._holUsersRepository.update({ id, payload: updateUser });
  }
}
module.exports = UpdateUsersUseCase;
