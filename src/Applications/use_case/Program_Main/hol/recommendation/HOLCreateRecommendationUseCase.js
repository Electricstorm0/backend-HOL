class HOLCreateRecommendationUseCase {
  constructor({ HOLRecommendationsRepository, HOLRecommendationsStatusRepository }) {
    this._HOLRecommendationsRepository = HOLRecommendationsRepository;
    this._HOLRecommendationsStatusRepository = HOLRecommendationsStatusRepository;
  }

  async execute({ HOLUsersRecommendationId }, payload) {
    try {
      const { institutions, purposes, deadline, details } = payload;

      const recommendationId = await this._HOLRecommendationsRepository.create({
        HOLUsersRecommendationId,
        institutions,
        purposes,
        deadline,
        details,
      });

      await this._HOLRecommendationsStatusRepository.create({
        HOLRecommendationId: recommendationId,
        isChecked: 0,
      });
      return recommendationId;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = HOLCreateRecommendationUseCase;
