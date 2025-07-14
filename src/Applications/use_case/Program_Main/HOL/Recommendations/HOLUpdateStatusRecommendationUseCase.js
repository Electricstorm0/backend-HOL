const updateRecommendations = require('../../../../../Domains/program_main/hol/recommendations/entities/UpdateRecommendations');

class HOLUpdateStatusRecommendationUseCase {
  constructor({ usersBCFRepository, holRecommendationsStatusRepository }) {
    this._usersBCFRepository = usersBCFRepository;
    this._holRecommendationsStatusRepository = holRecommendationsStatusRepository;
  }

  async execute({ recommendationHolId }, { id: adminId }, payload) {
    const recommendation = new updateRecommendations(payload);
    await this._usersBCFRepository.readById({ id: adminId });
    const useCase = await this._holRecommendationsStatusRepository.update({ recommendationHolId, adminId, isChecked: 1, payload: recommendation });
    return useCase;
  }
}
module.exports = HOLUpdateStatusRecommendationUseCase;
