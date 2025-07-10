const GetUsersEvents = require('../../../../../../Domains/program_main/hol/Events/entities/getUsersEvents');

class HOLGetUsersEventsUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute() {
    const users = await this._HOLUsersEventsRepository.read();
    const result = await Promise.all(
      users.map(async (value) => ({
        ...new GetUsersEvents({
          ...value,
        }),
      }))
    );
    return result;
  }
}

module.exports = HOLGetUsersEventsUseCase;
