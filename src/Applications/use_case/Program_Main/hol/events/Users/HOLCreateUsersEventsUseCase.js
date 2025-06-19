class HOLCreateUsersEventsUseCase {
  constructor({ HOLUsersEventsRepository, HOLEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
    this._HOLEventsRepository = HOLEventsRepository;
  }

  async execute({ usersHOLId, eventsHOLId }) {
    const isRegistered = await this._HOLUsersEventsRepository.checkRegisteredUsersEvents({ usersHOLId, eventsHOLId });
    if (isRegistered) {
      throw new Error('user has registered');
    } else {
      const eventsType = await this._HOLEventsRepository.readEventsTypeByEventsId({ eventsHOLId });
      const status = eventsType.id_hol_events_type === 3 ? 0 : 1;
      const userseventId = await this._HOLUsersEventsRepository.create({
        usersHOLId,
        eventsHOLId,
        status,
      });
      return userseventId;
    }
  }
}
module.exports = HOLCreateUsersEventsUseCase;
