const updateAchieve = require('../UpdateAchievements');

describe('updateAchieve entity', () => {
  it('should create updateAchieve entity correctly when given valid payload', () => {
    // Arrange
    const payload = {
      usersId: 10,
      eventsName: 'National Seminar',
      eventsYear: 2024,
      bcfContribution: 'Speaker',
      achievements: 'Presented research paper',
    };

    // Act
    const result = new updateAchieve(payload);

    // Assert
    expect(result.id_users_hol).toBe(payload.usersId);
    expect(result.events_name).toBe(payload.eventsName);
    expect(result.events_year).toBe(payload.eventsYear);
    expect(result.bcf_contribution).toBe(payload.bcfContribution);
    expect(result.achievements).toBe(payload.achievements);
  });

  it('should throw error when missing required properties', () => {
    // Arrange
    const payload = {
      usersId: 10,
      eventsName: '', // Empty string should be treated as missing
      eventsYear: 2024,
      bcfContribution: 'Speaker',
      achievements: 'Presented research paper',
    };

    // Act & Assert
    expect(() => new updateAchieve(payload)).toThrowError('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when any required property is undefined', () => {
    // Arrange
    const payload = {
      usersId: 10,
      // eventsName is undefined
      eventsYear: 2024,
      bcfContribution: 'Speaker',
      achievements: 'Presented research paper',
    };

    // Act & Assert
    expect(() => new updateAchieve(payload)).toThrowError('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
