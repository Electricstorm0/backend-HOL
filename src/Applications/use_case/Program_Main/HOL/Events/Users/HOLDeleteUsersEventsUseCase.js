class HOLDeleteUsersEventsUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ id }) {
    const users = await this._holUsersEventsRepository.delete({ id });

    return users;
  }
}
module.exports = HOLDeleteUsersEventsUseCase;
