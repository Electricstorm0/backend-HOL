const UpdateCFF = require('../UpdateCFF');

describe('Update CFF entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      position: 'Mentor',
      category: 'Fellowship',
      // placements dan requirements tidak ada
    };

    // Action & Assert
    expect(() => new UpdateCFF(payload)).toThrowError('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create UpdateCFF entity correctly', () => {
    // Arrange
    const payload = {
      logo_url: 'http://example.com/logo.png',
      position: 'Mentor',
      category: 'Fellowship',
      placements: 'Surabaya',
      register_url: 'http://example.com/register',
      requirements: 'Minimal semester 6',
    };

    // Action
    const cff = new UpdateCFF(payload);

    // Assert
    expect(cff).toBeInstanceOf(UpdateCFF);
    expect(cff.logo_url).toEqual(payload.logo_url);
    expect(cff.position).toEqual(payload.position);
    expect(cff.category).toEqual(payload.category);
    expect(cff.placements).toEqual(payload.placements);
    expect(cff.requirements).toEqual(payload.requirements);
    expect(cff.register_url).toEqual(payload.register_url);
  });
});
