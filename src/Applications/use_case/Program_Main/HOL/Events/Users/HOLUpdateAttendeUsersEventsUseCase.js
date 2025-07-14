class HOLUpdateAttendeUsersEventsUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ id: usersHOLId }, { eventsHOLId }) {
    await this._holUsersEventsRepository.updateAttendance({ usersHOLId, eventsHOLId });
  }
}
module.exports = HOLUpdateAttendeUsersEventsUseCase;
