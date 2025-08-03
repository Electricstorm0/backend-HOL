const GetEvents = require('../GetEvents');

describe('Get Events entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'Acara Lari Bersama',
    };

    // Action & Assert
    expect(() => new GetEvents(payload)).toThrowError('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 1234,
      deadline: '2025-12-3',
      duration: '1 hari',
      description: 'ini adalah acara baru',
      benefit: 'sertifikat',
      contact_person: 'susanto 08163846293784',
    };

    // Action & Assert
    expect(() => new GetEvents(payload)).toThrowError('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should Get Events entities correctly', () => {
    // Arrange
    const payload = {
      name: 'acara lari bersama',
      deadline: new Date('2025-12-2'),
      duration: '1 hari',
      description: 'ini adalah acara baru',
      benefit: 'sertifikat',
      contact_person: 'susanto 08163846293784',
    };

    // Action
    const getEvents = new GetEvents(payload);

    // Assert
    expect(getEvents).toBeInstanceOf(GetEvents);
    expect(getEvents.name).toEqual(payload.name);
    expect(getEvents.deadline).toEqual(payload.deadline);
    expect(getEvents.duration).toEqual(payload.duration);
    expect(getEvents.description).toEqual(payload.description);
    expect(getEvents.benefit).toEqual(payload.benefit);
    expect(getEvents.contact_person).toEqual(payload.contact_person);
  });
});
