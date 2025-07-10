class HOLGetDetailInvolvementsUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ usersHOLId }) {
    const useCase = await this._HOLUsersEventsRepository.readByUsersIdAndAttendance({ usersHOLId });
    return useCase;
  }
}

module.exports = HOLGetDetailInvolvementsUseCase;
