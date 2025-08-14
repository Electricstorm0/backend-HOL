const GetUsersEventsActivity = require('../../../../../../Domains/program_main/hol/events/entities/GetUsersEventActivity');

class HOLGetUsersEventsByUsersIdUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ id: usersId, status }) {
    const users = (await this._holUsersEventsRepository.readByUsersIdAndStatus({ usersId, status })) || [];
    const result = await Promise.all(
      users.map(async (value) => ({
        ...new GetUsersEventsActivity({
          ...value,
        }),
      }))
    );
    return result;
  }
}

module.exports = HOLGetUsersEventsByUsersIdUseCase;
