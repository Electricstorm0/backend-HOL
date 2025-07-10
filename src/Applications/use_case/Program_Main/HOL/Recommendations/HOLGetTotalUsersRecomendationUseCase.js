// INI UNTUK HITUNG TOTAL USERS

class HOLGetTotalUsersRecomendationUseCase {
  constructor({ HOLRecommendationsStatusRepository }) {
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
  }

  async execute() {
    const result = await this._HOLRecommendationsStatusRepository.readCountRecommendation();
    return result;
  }
}

module.exports = HOLGetTotalUsersRecomendationUseCase;
