const updateUsers = require('../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsers');

class UpdateUsersUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute({ id }, payload) {
    const updateUser = new updateUsers(payload);
    await this._HOLUsersRepository.update({ id, payload: updateUser });
  }
}
module.exports = UpdateUsersUseCase;
