class HOLUpdateStatusUsersEventsUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ usersHOLId, eventsHOLId }) {
    const useCase = await this._holUsersEventsRepository.updateStatusUsersEvents({ usersHOLId, eventsHOLId });
    return useCase;
  }
}
module.exports = HOLUpdateStatusUsersEventsUseCase;
