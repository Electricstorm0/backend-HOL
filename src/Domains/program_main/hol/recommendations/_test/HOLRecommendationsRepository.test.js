const HOLRecommendationsRepository = require('../HOLRecommendationsRepository');

describe('HOL Recommendation interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const recommendationRepository = new HOLRecommendationsRepository();

    // Action and Assert
    await expect(recommendationRepository.create(' ')).rejects.toThrowError('HOL_RECOMMENDATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationRepository.update(' ')).rejects.toThrowError('HOL_RECOMMENDATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationRepository.readByStatusId(' ')).rejects.toThrowError('HOL_RECOMMENDATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationRepository.readByUserId(' ')).rejects.toThrowError('HOL_RECOMMENDATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(recommendationRepository.readById(' ')).rejects.toThrowError('HOL_RECOMMENDATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
