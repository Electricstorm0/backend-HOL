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
      name: 1234,
      id_regencies: 2,
      deadline: '2025-12-3',
      duration: '1 hari',
      description: 'ini adalah acara baru',
      benefit: 'sertifikat',
      contact_person: 'susanto 08163846293784',
    };

    // Action & Assert
    expect(() => new UpdateEvents(payload)).toThrowError('UPDATE_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should Update Eventsentities correctly', () => {
    // Arrange
    const payload = {
      name: 'Acara Lari Bersama',
      id_regencies: 2,
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
    expect(updateEvents.name).toEqual(payload.name);
    expect(updateEvents.id_regencies).toEqual(payload.regenciesId);
    expect(updateEvents.deadline).toEqual(payload.deadline);
    expect(updateEvents.duration).toEqual(payload.duration);
    expect(updateEvents.description).toEqual(payload.description);
    expect(updateEvents.benefit).toEqual(payload.benefit);
    expect(updateEvents.contact_person).toEqual(payload.contact_person);
  });
});
