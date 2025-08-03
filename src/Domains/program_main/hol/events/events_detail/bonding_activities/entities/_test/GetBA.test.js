const GetBA = require('../GetBA');

describe('GetBA entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'Acara Kebersamaan',
      // property lain sengaja tidak disertakan
    };

    // Action & Assert
    expect(() => new GetBA(payload)).toThrowError('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id_events_hol: 1,
      id_hol_events_type: 2,
      name: 123, // salah tipe
      deadline: '2025-12-31', // salah tipe, seharusnya Date object
      duration: 3, // salah tipe
      id_regencies: 7,
      description: {}, // salah tipe
      benefit: true, // salah tipe
      contact_person: 99999, // salah tipe
      picture_url: 'http://example.com/image.jpg',
      category: 123, // salah tipe
    };

    // Action & Assert
    expect(() => new GetBA(payload)).toThrowError('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create GetBA entity correctly', () => {
    // Arrange
    const payload = {
      id_events_hol: 1,
      id_hol_events_type: 2,
      name: 'Acara Kebersamaan',
      deadline: new Date('2025-12-31'),
      duration: '2 hari',
      id_regencies: 7,
      description: 'Acara untuk mempererat hubungan',
      benefit: 'sertifikat dan pengalaman',
      contact_person: 'Budi 08123456789',
      picture_url: 'http://example.com/image.jpg',
      category: 'bonding',
    };

    // Action
    const getBA = new GetBA(payload);

    // Assert
    expect(getBA).toBeInstanceOf(GetBA);
    expect(getBA.bondingActivitiesId).toEqual(payload.id_events_hol);
    expect(getBA.holEventTypeId).toEqual(payload.id_hol_events_type);
    expect(getBA.pictureUrl).toEqual(payload.picture_url);
    expect(getBA.name).toEqual(payload.name);
    expect(getBA.category).toEqual(payload.category);
    expect(getBA.regenciesId).toEqual(payload.id_regencies);
    expect(getBA.deadline).toEqual(payload.deadline);
    expect(getBA.duration).toEqual(payload.duration);
    expect(getBA.description).toEqual(payload.description);
    expect(getBA.benefit).toEqual(payload.benefit);
    expect(getBA.contact_person).toEqual(payload.contact_person);
  });
});
