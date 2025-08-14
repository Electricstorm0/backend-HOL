const UpdateEvents = require('../UpdateEvents');

describe('Update Events entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'Acara Lari Bersama',
    };

    // Action & Assert
    expect(() => new UpdateEvents(payload)).toThrowError('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      pictureUrl: 'http://example.com/logo.png',
      name: 1234,
      regenciesId: 2,
      deadline: '2025-12-3',
      duration: '1 hari',
      description: 'ini adalah acara baru',
      benefit: 'sertifikat',
      contact_person: 'susanto 08163846293784',
    };

    // Action & Assert
    expect(() => new UpdateEvents(payload)).toThrowError('UPDATE_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should Update Events entities correctly', () => {
    // Arrange
    const payload = {
      pictureUrl: 'http://example.com/logo.png',
      name: 'Acara Lari Bersama',
      regenciesId: 2,
      deadline: new Date('2025-12-3'),
      duration: '1 hari',
      description: 'ini adalah acara baru',
      benefit: 'sertifikat',
      contact_person: 'susanto 08163846293784',
    };

    // Action
    const updateEvents = new UpdateEvents(payload);

    // Assert
    expect(updateEvents).toBeInstanceOf(UpdateEvents);
    expect(updateEvents.picture_url).toEqual(payload.pictureUrl);
    expect(updateEvents.name).toEqual(payload.name);
    expect(updateEvents.id_regencies).toEqual(payload.regenciesId);
    expect(updateEvents.deadline).toEqual(new Date(payload.deadline));
    expect(updateEvents.duration).toEqual(payload.duration);
    expect(updateEvents.description).toEqual(payload.description);
    expect(updateEvents.benefit).toEqual(payload.benefit);
    expect(updateEvents.contact_person).toEqual(payload.contact_person);
  });
});
