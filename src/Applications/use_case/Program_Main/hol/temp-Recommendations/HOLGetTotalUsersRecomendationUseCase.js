// INI UNTUK HITUNG TOTAL USERS

class HOLGetTotalUsersRecomendationUseCase {
  constructor({ HOLRecommendationsStatusRepository }) {
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
  }

  async execute() {
    try {
      const result = await this._HOLRecommendationsStatusRepository.readCountRecommendation();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetTotalUsersRecomendationUseCase;
