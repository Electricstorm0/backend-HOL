const getRecommendation = require('../../../../../Domains/program_main/hol/recommendations/entities/GetRecommendations');

class HOLGetRecommendationByUserIdUseCase {
  constructor({ holRecommendationsRepository }) {
    this._holRecommendationsRepository = holRecommendationsRepository;
  }

  async execute({ id: HOLUsersRecommendationId }) {
    const useCase = (await this._holRecommendationsRepository.readByUserId({ HOLUsersRecommendationId })) || [];
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
