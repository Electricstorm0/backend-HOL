const updateRecommendations = require('../../../../../Domains/program_main/hol/Recomendations/entities/UpdateRecommendations');

class HOLUpdateStatusRecommendationUseCase {
  constructor({ HOLRecommendationsStatusRepository }) {
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
  }

  async execute({ recommendationHolId, updateBy }, payload) {
    try {
      const recommendation = new updateRecommendations(payload);
      const useCase = await this._HOLRecommendationsStatusRepository.update({ recommendationHolId, updateBy, payload: recommendation });
      return useCase;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = HOLUpdateStatusRecommendationUseCase;
