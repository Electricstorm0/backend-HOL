const usersScore = require('../../../../../Domains/program_main/hol/users/entities/dummy/usersScores');

class HOLCreateRecommendationUseCase {
  constructor({ HOLRecommendationsRepository, HOLRecommendationsStatusRepository }) {
    this._HOLRecommendationsRepository = HOLRecommendationsRepository;
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
  }

  async execute({ HOLUsersRecommendationId }, payload) {
    const { institutions, purposes, deadline, details } = payload;
    const userScore = usersScore.find((u) => u.usersId === HOLUsersRecommendationId);

    if (userScore.score <= 85) {
      throw new Error('Mohon maaf nilai anda tidak memenuhi kriteria minimum 85');
    } else {
      const recommendationId = await this._HOLRecommendationsRepository.create({
        HOLUsersRecommendationId,
        institutions,
        purposes,
        deadline,
        details,
      });

      await this._HOLRecommendationsStatusRepository.create({
        HOLRecommendationId: recommendationId,
        isChecked: 0,
      });
      return recommendationId;
    }
  }
}
module.exports = HOLCreateRecommendationUseCase;
