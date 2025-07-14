// INI UNTUK HITUNG TOTAL USERS

class HOLGetTotalUsersEventsByEventsIdAndStatusUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ eventsHOLId, status }) {
    const result = await this._holUsersEventsRepository.readCountUsersEventsByEventsIdAndStatus({ eventsHOLId, status });
    return result;
  }
}

module.exports = HOLGetTotalUsersEventsByEventsIdAndStatusUseCase;
