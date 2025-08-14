const GetUsersEventsActivity = require('../../../../../../Domains/program_main/hol/events/entities/GetUsersEventActivity');

class HOLGetUsersEventsStatusByUsersIdUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ id: usersId }) {
    const users = (await this._holUsersEventsRepository.readByUsersId({ usersId })) || [];
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

module.exports = HOLGetUsersEventsStatusByUsersIdUseCase;
