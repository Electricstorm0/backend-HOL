const getRecommendation = require('../../../../../Domains/program_main/hol/recommendations/entities/GetRecommendations');

class HOLGetRecommendationByIdUseCase {
  constructor({ holRecommendationsRepository }) {
    this._holRecommendationsRepository = holRecommendationsRepository;
  }

  async execute({ id }) {
    const useCase = (await this._holRecommendationsRepository.readById({ id })) || {};
    const result = new getRecommendation({ ...useCase });
    return result;
  }
}
module.exports = HOLGetRecommendationByIdUseCase;
