class HOLGetTotalUsersEventsByEventsTypeUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ holEventsTypeId }) {
    const result = await this._holUsersEventsRepository.readCountUsersEventsByEventsTypeId({ holEventsTypeId });
    return result;
  }
}

module.exports = HOLGetTotalUsersEventsByEventsTypeUseCase;
