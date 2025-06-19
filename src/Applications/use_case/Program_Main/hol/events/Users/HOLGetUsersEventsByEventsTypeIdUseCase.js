const NotFoundError = require('../../../../../../Commons/exceptions/NotFoundError');
const GetUsersEvents = require('../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

class HOLGetUsersEventsByEventsTypeIdUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ id }) {
    const users = await this._HOLUsersEventsRepository.readById({ id }); // misal typeId: 1 untuk CFF
    if (!users || users.length === 0) {
      throw new NotFoundError(`Data tidak ditemukan`);
    }
    const result = new GetUsersEvents({ ...users });

    return result;
  }
}

module.exports = HOLGetUsersEventsByEventsTypeIdUseCase;
