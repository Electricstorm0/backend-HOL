const GetInvolve = require('../GetInvolvements');

describe('GetInvolve entity', () => {
  it('should create GetInvolve entity correctly when given valid payload', () => {
    // Arrange
    const payload = {
      id: 1,
      id_users_events: 100,
      id_users_hol: 200,
    };

    // Act
    const involve = new GetInvolve(payload);

    // Assert
    expect(involve.involvementId).toBe(payload.id);
    expect(involve.usersEventsId).toBe(payload.id_users_events);
    expect(involve.usersId).toBe(payload.id_users_hol);
  });

  it('should throw error when required properties are missing', () => {
    // Arrange
    const payload = {
      id: 1,
      id_users_events: 100,
      // id_users_hol missing
    };

    // Act & Assert
    expect(() => new GetInvolve(payload)).toThrowError('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when properties are not correct data types', () => {
    // Arrange
    const payload = {
      id: 1,
      id_users_events: 'not-a-number',
      id_users_hol: 200,
    };

    // Act & Assert
    expect(() => new GetInvolve(payload)).toThrowError('GET_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
