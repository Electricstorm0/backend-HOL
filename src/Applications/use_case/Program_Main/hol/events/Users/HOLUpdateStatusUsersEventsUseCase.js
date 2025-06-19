class HOLUpdateStatusUsersEventsUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ usersHOLId, eventsHOLId }) {
    const useCase = await this._HOLUsersEventsRepository.updateStatusUsersEvents({ usersHOLId, eventsHOLId });
    return useCase;
  }
}
module.exports = HOLUpdateStatusUsersEventsUseCase;
