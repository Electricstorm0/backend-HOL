const HOLAddUsers = require('../HOLAddUsers');

describe('HOLAddUsers entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      fullname: 'John Doe',
      email: 'john@example.com',
      // password missing
    };

    // Action & Assert
    expect(() => new HOLAddUsers(payload)).toThrowError('HOL_ADD_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      fullname: 123,
      email: true,
      password: {},
    };

    // Action & Assert
    expect(() => new HOLAddUsers(payload)).toThrowError('HOL_ADD_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create HOLAddUsers entity correctly', () => {
    // Arrange
    const payload = {
      fullname: 'Jane Smith',
      email: 'jane@example.com',
      password: 'securepassword',
      batchId: 1,
      thirdTierProgramId: 3,
    };

    // Action
    const user = new HOLAddUsers(payload);

    // Assert
    expect(user).toBeInstanceOf(HOLAddUsers);
    expect(user.fullname).toEqual(payload.fullname);
    expect(user.email).toEqual(payload.email);
    expect(user.password).toEqual(payload.password);
    expect(user.batchId).toEqual(payload.batchId);
    expect(user.thirdTierProgramId).toEqual(payload.thirdTierProgramId);
  });
});
