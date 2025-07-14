const GetUsersEvents = require('../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

class HOLGetUsersEventsByIdUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ id }) {
    const users = (await this._holUsersEventsRepository.readById({ id })) || {};
    const result = new GetUsersEvents({ ...users });
    return result;
  }
}

module.exports = HOLGetUsersEventsByIdUseCase;
