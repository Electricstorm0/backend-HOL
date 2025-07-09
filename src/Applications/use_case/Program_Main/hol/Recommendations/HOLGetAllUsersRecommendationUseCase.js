const getUsersRecommendation = require('../../../../../Domains/program_main/hol/temp-Recomendations/entities/getUsersRecommendation');

class HOLGetAllUsersRecommendationUseCase {
  constructor({ HOLRecommendationsStatusRepository, HOLRecommendationsRepository }) {
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
    this._HOLRecommendationsRepository = HOLRecommendationsRepository;
  }

  async execute({ pageSize, page }) {
    try {
      const numPerPage = parseInt(pageSize, 10) || 1;
      const offset = parseInt(page - 1, 10) || 0;
      const skip = offset * numPerPage;
      const numRows = await this._HOLRecommendationsStatusRepository.readCountRecommendation();
      const numPages = Math.ceil(numRows / numPerPage);
      const recommendation = await this._HOLRecommendationsRepository.read({ skip, numPerPage }); // misal typeId: 1 untuk CFF
      const result = await Promise.all(
        recommendation.map(async (value) => ({
          ...new getUsersRecommendation({
            ...value,
          }),
        }))
      );
      return {
        result,
        current: offset,
        perPage: numPerPage,
        previous: offset > 0 ? page - 1 : undefined,
        next: offset < numPages - 1 ? offset + 1 : undefined,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetAllUsersRecommendationUseCase;
