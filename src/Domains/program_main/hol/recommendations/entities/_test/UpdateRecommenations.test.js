const updateRecommendations = require('../UpdateRecommendations');

describe('Update Recommendations entities', () => {
  it('should create updateRecommendations entity correctly', () => {
    // Arrange
    const payload = {
      recommendationStatusId: 2,
      note: 'Telah disetujui oleh admin',
    };

    // Action
    const update = new updateRecommendations(payload);

    // Assert
    expect(update).toBeInstanceOf(updateRecommendations);
    expect(update.id_recommendations_status).toEqual(payload.recommendationStatusId);
    expect(update.note).toEqual(payload.note);
  });
});
