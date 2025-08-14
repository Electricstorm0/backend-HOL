const InvariantError = require('../../../../../../Commons/exceptions/InvariantError');
class HOLCreateUsersEventsUseCase {
  constructor({ holUsersEventsRepository, holEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
    this._holEventsRepository = holEventsRepository;
  }

  async execute({ id: usersHOLId }, { eventsHOLId }) {
    const isRegistered = await this._holUsersEventsRepository.checkRegisteredUsersEvents({ usersHOLId, eventsHOLId });
    if (isRegistered) {
      throw new InvariantError('user has registered');
    } else {
      const events = await this._holEventsRepository.readEventsTypeAndPositionByEventsId({ eventsHOLId });
      const status = events[0].id_hol_events_type === 3 && events[0].position === 'panitia' ? 'checking' : 'approve';
      const userseventId = await this._holUsersEventsRepository.create({
        usersHOLId,
        eventsHOLId,
        status,
      });
      return userseventId;
    }
  }
}
module.exports = HOLCreateUsersEventsUseCase;
