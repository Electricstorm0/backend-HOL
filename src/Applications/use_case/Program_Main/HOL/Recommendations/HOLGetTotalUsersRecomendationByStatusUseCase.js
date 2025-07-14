// INI UNTUK HITUNG TOTAL USERS BERDASARKAN STATUSNYA

class HOLGetTotalUsersRecomendationByStatusUseCase {
  constructor({ holRecommendationsStatusRepository }) {
    this._holRecommendationsStatusRepository = holRecommendationsStatusRepository;
  }

  async execute({ recommendationStatusId }) {
    const result = await this._holRecommendationsStatusRepository.readCountRecommendationByStatus({ recommendationStatusId });
    return result;
  }
}

module.exports = HOLGetTotalUsersRecomendationByStatusUseCase;
