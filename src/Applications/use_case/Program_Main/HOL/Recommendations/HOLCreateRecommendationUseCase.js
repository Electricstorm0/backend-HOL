const usersScore = require('../../../../../Domains/program_main/hol/users/entities/dummy/UsersScores');

class HOLCreateRecommendationUseCase {
  constructor({ holRecommendationsRepository, holRecommendationsStatusRepository }) {
    this._holRecommendationsRepository = holRecommendationsRepository;
    this._holRecommendationsStatusRepository = holRecommendationsStatusRepository;
  }

  async execute({ id: HOLUsersRecommendationId }, payload) {
    const { institutions, purposes, deadline, details } = payload;
    const userScore = usersScore.find((u) => u.usersId === HOLUsersRecommendationId);

    if (userScore.score <= 85) {
      throw new Error('Mohon maaf nilai anda tidak memenuhi kriteria minimum 85');
    } else {
      const recommendationId = await this._holRecommendationsRepository.create({
        HOLUsersRecommendationId,
        institutions,
        purposes,
        deadline,
        details,
      });

      await this._holRecommendationsStatusRepository.create({
        HOLRecommendationId: recommendationId,
        isChecked: 0,
      });
      return recommendationId;
    }
  }
}
module.exports = HOLCreateRecommendationUseCase;
