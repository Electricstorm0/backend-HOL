const GetAchieve = require('../GetAchievements');

describe('GetAchieve entity', () => {
  it('should create GetAchieve entity correctly when given valid payload', () => {
    // Arrange
    const payload = {
      id: 1,
      id_users_hol: 100,
      events_name: 'LOKABAKTI NASIONAL',
      events_year: 2023,
      bcf_contribution: 'Panitia Acara',
      achievements: 'Juara 1 Lomba Esai',
    };

    // Act
    const achieve = new GetAchieve(payload);

    // Assert
    expect(achieve.achievementId).toEqual(payload.id);
    expect(achieve.usersId).toEqual(payload.id_users_hol);
    expect(achieve.eventsName).toEqual(payload.events_name);
    expect(achieve.eventsYear).toEqual(payload.events_year);
    expect(achieve.bcfContribution).toEqual(payload.bcf_contribution);
    expect(achieve.achievements).toEqual(payload.achievements);
  });

  it('should throw error when missing required property', () => {
    // Arrange
    const payload = {
      id: 2,
      id_users_hol: 101,
      events_name: 'Seminar Nasional',
      events_year: 2022,
      // bcf_contribution missing
      achievements: 'Pembicara Tamu',
    };

    // Act & Assert
    expect(() => new GetAchieve(payload)).toThrowError('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when data types are incorrect', () => {
    // Arrange
    const payload = {
      id: 3,
      id_users_hol: 'wrong_type', // should be number
      events_name: 2023, // should be string
      events_year: '2021', // should be number
      bcf_contribution: 1234, // should be string
      achievements: {}, // should be string
    };

    // Act & Assert
    expect(() => new GetAchieve(payload)).toThrowError('GET_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
