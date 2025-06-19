class HOLGetDetailInvolvementsUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ usersHOLId }) {
    try {
      const useCase = await this._HOLUsersEventsRepository.readByUsersIdAndAttendance({ usersHOLId });
      return useCase;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetDetailInvolvementsUseCase;
