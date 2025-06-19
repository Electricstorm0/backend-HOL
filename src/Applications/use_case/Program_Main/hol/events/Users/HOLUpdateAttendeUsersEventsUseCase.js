class HOLUpdateAttendeUsersEventsUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ usersHOLId, eventsHOLId }) {
    await this._HOLUsersEventsRepository.updateAttendance({ usersHOLId, eventsHOLId });
  }
}
module.exports = HOLUpdateAttendeUsersEventsUseCase;
