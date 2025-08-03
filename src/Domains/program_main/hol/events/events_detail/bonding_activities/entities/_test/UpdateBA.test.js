const updateBA = require('../UpdateBA');

describe('updateBA entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      pictureUrl: 'http://example.com/image.jpg',
      // category tidak ada
    };

    // Action & Assert
    expect(() => new updateBA(payload)).toThrowError('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create updateBA entity correctly', () => {
    // Arrange
    const payload = {
      pictureUrl: 'http://example.com/image.jpg',
      category: 'bonding',
    };

    // Action
    const updatedBA = new updateBA(payload);

    // Assert
    expect(updatedBA).toBeInstanceOf(updateBA);
    expect(updatedBA.picture_url).toEqual(payload.pictureUrl);
    expect(updatedBA.category).toEqual(payload.category);
  });
});
