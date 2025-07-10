const HolGetUsers = require('../../../../../Domains/program_main/hol/Users/entities/HolGetUsers');

class HOLGetUsersUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute({ pageSize, page }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;
    const skip = offset * numPerPage;
    const numRows = await this._HOLUsersRepository.readCountUsers();
    const numPages = Math.ceil(numRows / numPerPage);
    const [users, journeys] = await Promise.all([this._HOLUsersRepository.read({ skip, numPerPage }), this._HOLUsersRepository.readJourneyUsers()]);

    const result = await Promise.all(
      users.map(async (value) => {
        const recentJourney = journeys.find((j) => j.id_users_hol === value.id_users);

        return new HolGetUsers({
          ...value,
          photoProfile: 'profileKu.JPG',
          recent_journey: recentJourney?.recent_journey || null,
        });
      })
    );
    return {
      result,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}

module.exports = HOLGetUsersUseCase;
