const getUsersRecommendation = require('../../../../../Domains/program_main/hol/recommendations/entities/GetUsersRecommendation');

class HOLGetAllUsersRecommendationUseCase {
  constructor({ holRecommendationsStatusRepository, holRecommendationsRepository }) {
    this._holRecommendationsStatusRepository = holRecommendationsStatusRepository;
    this._holRecommendationsRepository = holRecommendationsRepository;
  }

  async execute({ pageSize, page }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;
    const skip = offset * numPerPage;
    const numRows = await this._holRecommendationsStatusRepository.readCountRecommendation();
    const numPages = Math.ceil(numRows / numPerPage);
    const recommendation = (await this._holRecommendationsRepository.read({ skip, numPerPage })) || [];
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
  }
}

module.exports = HOLGetAllUsersRecommendationUseCase;
