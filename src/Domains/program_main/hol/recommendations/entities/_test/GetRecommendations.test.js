const getRecommendation = require('../GetRecommendations');

describe('Get Recommendation entities', () => {
  it('should create getRecommendation entity correctly', () => {
    // Arrange
    const payload = {
      id: 'rec-001',
      id_hol_users_recommendations: 'user-rec-123',
      institutions: 'Universitas Bakrie',
      pusposes: 'Melanjutkan studi',
      deadline: new Date('2025-11-30'),
      details: 'Membutuhkan surat rekomendasi secepatnya',
      created_at: new Date('2025-10-01'),
      status: 'checking',
    };

    // Action
    const recommendation = new getRecommendation(payload);

    // Assert
    expect(recommendation).toBeInstanceOf(getRecommendation);
    expect(recommendation.recommendationId).toEqual(payload.id);
    expect(recommendation.usersRecommendationId).toEqual(payload.id_hol_users_recommendations);
    expect(recommendation.institutions).toEqual(payload.institutions);
    expect(recommendation.purposes).toEqual(payload.pusposes);
    expect(recommendation.deadline).toEqual(payload.deadline);
    expect(recommendation.detail).toEqual(payload.details);
    expect(recommendation.tanggal_pengajuan).toEqual(payload.created_at);
    expect(recommendation.status).toEqual(payload.status);
  });
});
