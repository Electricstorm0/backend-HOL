const UpdateInvolve = require('../UpdateInvolvements');

describe('UpdateInvolve entity', () => {
  it('should create UpdateInvolve entity correctly when given valid payload', () => {
    // Arrange
    const payload = {
      usersId: 123,
      holUsersEventsId: 456,
    };

    // Act
    const updateInvolve = new UpdateInvolve(payload);

    // Assert
    expect(updateInvolve.id_users_events).toBe(payload.holUsersEventsId);
    expect(updateInvolve.id_users_hol).toBe(payload.usersId);
  });

  it('should throw error when required property holUsersEventsId is missing', () => {
    // Arrange
    const payload = {
      usersId: 123,
      // holUsersEventsId missing
    };

    // Act & Assert
    expect(() => new UpdateInvolve(payload)).toThrowError('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
