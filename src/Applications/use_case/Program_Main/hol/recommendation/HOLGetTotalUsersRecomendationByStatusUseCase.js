// INI UNTUK HITUNG TOTAL USERS

class HOLGetTotalUsersRecomendationByStatusUseCase {
  constructor({ HOLRecommendationsStatusRepository }) {
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
  }

  async execute({ recommendationStatusId }) {
    const result = await this._HOLRecommendationsStatusRepository.readCountRecommendationByStatus({ recommendationStatusId });
    return result;
  }
}

module.exports = HOLGetTotalUsersRecomendationByStatusUseCase;
