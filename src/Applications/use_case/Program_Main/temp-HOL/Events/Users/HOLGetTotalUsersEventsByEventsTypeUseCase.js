class HOLGetTotalUsersEventsByEventsTypeUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ holEventsTypeId }) {
    const result = await this._HOLUsersEventsRepository.readCountUsersEventsByEventsTypeId({ holEventsTypeId });
    return result;
  }
}

module.exports = HOLGetTotalUsersEventsByEventsTypeUseCase;
