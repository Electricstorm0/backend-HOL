// INI UNTUK HITUNG TOTAL USERS

class HOLGetTotalUsersRecomendationUseCase {
  constructor({ holRecommendationsStatusRepository }) {
    this._holRecommendationsStatusRepository = holRecommendationsStatusRepository;
  }

  async execute() {
    const result = await this._holRecommendationsStatusRepository.readCountRecommendation();
    return result;
  }
}

module.exports = HOLGetTotalUsersRecomendationUseCase;
