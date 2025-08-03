const updateIYSF = require('../UpdateIYSF');

describe('Update IYSF entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      logoUrl: 'http://example.com/logo.png',
      // position dan positionCategory tidak ada
    };

    // Action & Assert
    expect(() => new updateIYSF(payload)).toThrowError('UPDATE_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create updateIYSF entity correctly', () => {
    // Arrange
    const payload = {
      logoUrl: 'http://example.com/logo.png',
      position: 'Peserta',
      positionCategory: 'Pelajar',
      requirement: 'Minimal SMA',
      eventDate: new Date('2025-12-10'),
    };

    // Action
    const updatedIYSF = new updateIYSF(payload);

    // Assert
    expect(updatedIYSF).toBeInstanceOf(updateIYSF);
    expect(updatedIYSF.logo_url).toEqual(payload.logoUrl);
    expect(updatedIYSF.position).toEqual(payload.position);
    expect(updatedIYSF.position_category).toEqual(payload.positionCategory);
    expect(updatedIYSF.requirements).toEqual(payload.requirement);
    expect(updatedIYSF.event_date).toEqual(payload.eventDate);
  });
});
