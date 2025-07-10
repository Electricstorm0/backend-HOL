class HOLDeleteUsersEventsUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ id }) {
    const users = await this._HOLUsersEventsRepository.delete({ id });

    return users;
  }
}
module.exports = HOLDeleteUsersEventsUseCase;
