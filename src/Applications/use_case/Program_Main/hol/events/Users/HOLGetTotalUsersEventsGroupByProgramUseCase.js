// INI UNTUK DI KLASIFIKASI PER PROGRAM

class HOLGetTotalUsersEventsGroupByProgramUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ eventsHOLId, status }) {
    const result = await this._HOLUsersEventsRepository.readCountUsersEventsGroupByProgram({ eventsHOLId, status });
    return result;
  }
}

module.exports = HOLGetTotalUsersEventsGroupByProgramUseCase;
