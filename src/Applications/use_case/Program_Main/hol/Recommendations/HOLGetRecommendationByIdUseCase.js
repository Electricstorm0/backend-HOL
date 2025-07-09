const getRecommendation = require('../../../../../Domains/program_main/hol/temp-Recomendations/entities/GetRecommendations');

class HOLGetRecommendationByIdUseCase {
  constructor({ HOLRecommendationsRepository }) {
    this._HOLRecommendationsRepository = HOLRecommendationsRepository;
  }

  async execute({ id }) {
    try {
      const useCase = await this._HOLRecommendationsRepository.readById({ id });
      if (!useCase) {
        throw new Error('data tidak ditemukan');
      }
      const result = new getRecommendation({ ...useCase });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = HOLGetRecommendationByIdUseCase;
