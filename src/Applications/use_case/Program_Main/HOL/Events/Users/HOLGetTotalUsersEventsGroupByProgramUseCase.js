// INI UNTUK DI KLASIFIKASI PER PROGRAM

class HOLGetTotalUsersEventsGroupByProgramUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ eventsHOLId, status }) {
    const result = await this._holUsersEventsRepository.readCountUsersEventsGroupByProgram({ eventsHOLId, status });
    return result;
  }
}

module.exports = HOLGetTotalUsersEventsGroupByProgramUseCase;
