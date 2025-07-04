const HolGetUsers = require('../../../../../Domains/program_main/hol/users/entities/HolGetUsers');

class HOLGetUsersUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute() {
    try {
      const [users, journeys] = await Promise.all([this._HOLUsersRepository.read(), this._HOLUsersRepository.readJourneyUsers()]);

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
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetUsersUseCase;
