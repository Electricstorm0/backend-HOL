const MasterRecommendationsStatusRepository = require('../MasterRecommendationsStatusRepository');

describe('HOL Master Recommendation Status Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const masterRecommendationStatusRepository = new MasterRecommendationsStatusRepository();

    // Action and Assert
    await expect(masterRecommendationStatusRepository.create(' ')).rejects.toThrowError('MASTER_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterRecommendationStatusRepository.update(' ')).rejects.toThrowError('MASTER_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterRecommendationStatusRepository.delete(' ')).rejects.toThrowError('MASTER_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterRecommendationStatusRepository.read(' ')).rejects.toThrowError('MASTER_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterRecommendationStatusRepository.readById(' ')).rejects.toThrowError('MASTER_RECOMMENDATION_STATUS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
