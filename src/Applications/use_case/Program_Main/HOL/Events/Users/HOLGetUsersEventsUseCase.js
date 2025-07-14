const GetUsersEvents = require('../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

class HOLGetUsersEventsUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute() {
    const users = (await this._holUsersEventsRepository.read()) || [];
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
