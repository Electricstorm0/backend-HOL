// INI UNTUK HITUNG TOTAL USERS

class HOLGetTotalUsersEventsByEventsIdAndStatusUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ eventsHOLId, status }) {
    const result = await this._HOLUsersEventsRepository.readCountUsersEventsByEventsIdAndStatus({ eventsHOLId, status });
    return result;
  }
}

module.exports = HOLGetTotalUsersEventsByEventsIdAndStatusUseCase;
