class HOLGetUsersEventsByEventsIdUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ eventsHOLId }) {
    const result = await this._HOLUsersEventsRepository.readUsersEventsByEventsId({ eventsHOLId });
    return result;
  }
}

module.exports = HOLGetUsersEventsByEventsIdUseCase;
