const updateRecommendations = require('../../../../../Domains/program_main/hol/Recommendations/entities/UpdateRecommendations');

class HOLUpdateStatusRecommendationUseCase {
  constructor({ HOLRecommendationsStatusRepository }) {
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
  }

  async execute({ recommendationHolId, updateBy }, payload) {
    const recommendation = new updateRecommendations(payload);
    const useCase = await this._HOLRecommendationsStatusRepository.update({ recommendationHolId, updateBy, payload: recommendation });
    return useCase;
  }
}
module.exports = HOLUpdateStatusRecommendationUseCase;
