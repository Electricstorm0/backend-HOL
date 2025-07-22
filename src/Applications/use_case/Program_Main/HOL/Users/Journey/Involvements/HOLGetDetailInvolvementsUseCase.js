class HOLGetDetailInvolvementsUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ id: usersHOLId }) {
    const useCase = (await this._holUsersEventsRepository.readByUsersIdAndAttendance({ usersHOLId })) || [];
    return useCase;
  }
}

module.exports = HOLGetDetailInvolvementsUseCase;
