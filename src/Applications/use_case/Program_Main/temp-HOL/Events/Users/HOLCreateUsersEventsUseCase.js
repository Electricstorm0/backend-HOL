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
      const events = await this._HOLEventsRepository.readEventsTypeAndPositionByEventsId({ eventsHOLId });
      const status = events[0].id_hol_events_type === 3 && events[0].position === 'panitia' ? 0 : 1;
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
