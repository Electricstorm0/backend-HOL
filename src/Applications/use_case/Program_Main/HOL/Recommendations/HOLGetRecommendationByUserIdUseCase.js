const getRecommendation = require('../../../../../Domains/program_main/hol/recommendations/entities/GetRecommendations');

class HOLGetRecommendationByUserIdUseCase {
  constructor({ HOLRecommendationsRepository }) {
    this._HOLRecommendationsRepository = HOLRecommendationsRepository;
  }

  async execute({ HOLUsersRecommendationId }) {
    const useCase = await this._HOLRecommendationsRepository.readByUserId({ HOLUsersRecommendationId });
    if (!useCase) {
      throw new Error('data tidak ditemukan');
    }
    const result = await Promise.all(
      useCase.map(async (value) => ({
        ...new getRecommendation({
          ...value,
        }),
      }))
    );
    return result;
  }
}
module.exports = HOLGetRecommendationByUserIdUseCase;
