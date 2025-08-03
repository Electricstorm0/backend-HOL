const HOLRecommendationsStatusRepository = require('../HOLRecommendationsStatusRepository');

describe('HOL Recommendation Status Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const recommendationStatusRepository = new HOLRecommendationsStatusRepository();

    // Action and Assert
    await expect(recommendationStatusRepository.readCountRecommendation(' ')).rejects.toThrowError('HOL_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationStatusRepository.readCountRecommendationByStatus(' ')).rejects.toThrowError('HOL_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationStatusRepository.create(' ')).rejects.toThrowError('HOL_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationStatusRepository.update(' ')).rejects.toThrowError('HOL_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationStatusRepository.delete(' ')).rejects.toThrowError('HOL_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationStatusRepository.read(' ')).rejects.toThrowError('HOL_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationStatusRepository.readById(' ')).rejects.toThrowError('HOL_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
