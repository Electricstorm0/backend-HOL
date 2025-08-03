const HOLGetUsersMe = require('../HOLGetUsersMe');

describe('HOLGetUsersMe entity', () => {
  it('should create HOLGetUsersMe entity correctly', () => {
    // Arrange
    const payload = {
      currentlyProgram: 'Tech Fellowship',
      first_name: 'John',
      last_name: 'Doe',
    };

    // Act
    const user = new HOLGetUsersMe(payload);

    // Assert
    expect(user).toBeInstanceOf(HOLGetUsersMe);
    expect(user.firstName).toEqual(payload.first_name);
    expect(user.lastName).toEqual(payload.last_name);
    expect(user.currentlyProgram).toEqual(payload.currentlyProgram);
  });
});
