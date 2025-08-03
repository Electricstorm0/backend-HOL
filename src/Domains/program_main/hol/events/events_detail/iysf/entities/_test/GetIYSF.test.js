const GetIYSF = require('../GetIYSF');

describe('Get IYSF entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'IYSF 2025',
      deadline: new Date('2025-11-15'),
      duration: '2 hari',
      description: 'Acara forum ilmiah pelajar internasional',
      benefit: 'Sertifikat',
      contact_person: 'Ayu 08123456789',
      // requirements tidak ada
    };

    // Action & Assert
    expect(() => new GetIYSF(payload)).toThrowError('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id_events_hol: 'iysf-123',
      id_hol_events_type: 'type-456',
      logo_url: 'http://example.com/logo.png',
      name: 'IYSF ',
      position: 'Peserta',
      position_category: 'Pelajar',
      id_regencies: 'reg-999',
      deadline: new Date('2025-11-15'),
      event_date: new Date('2025-12-10'),
      duration: 2,
      description: 'Acara forum ilmiah pelajar internasional',
      benefit: 'Sertifikat',
      contact_person: 'Ayu 08123456789',
      requirements: 'Minimal SMA',
    };

    // Action & Assert
    expect(() => new GetIYSF(payload)).toThrowError('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create GetIYSF entity correctly', () => {
    // Arrange
    const payload = {
      id_events_hol: 'iysf-123',
      id_hol_events_type: 'type-456',
      logo_url: 'http://example.com/logo.png',
      name: 'IYSF 2025',
      position: 'Peserta',
      position_category: 'Pelajar',
      id_regencies: 'reg-999',
      deadline: new Date('2025-11-15'),
      event_date: new Date('2025-12-10'),
      duration: '2 hari',
      description: 'Acara forum ilmiah pelajar internasional',
      benefit: 'Sertifikat',
      contact_person: 'Ayu 08123456789',
      requirements: 'Minimal SMA',
    };

    // Action
    const iysf = new GetIYSF(payload);

    // Assert
    expect(iysf).toBeInstanceOf(GetIYSF);
    expect(iysf.iysfId).toEqual(payload.id_events_hol);
    expect(iysf.HolEventTypeId).toEqual(payload.id_hol_events_type);
    expect(iysf.logo_url).toEqual(payload.logo_url);
    expect(iysf.name).toEqual(payload.name);
    expect(iysf.position).toEqual(payload.position);
    expect(iysf.positionCategory).toEqual(payload.position_category);
    expect(iysf.regenciesId).toEqual(payload.id_regencies);
    expect(iysf.deadline).toEqual(payload.deadline);
    expect(iysf.eventDate).toEqual(payload.event_date);
    expect(iysf.duration).toEqual(payload.duration);
    expect(iysf.description).toEqual(payload.description);
    expect(iysf.benefit).toEqual(payload.benefit);
    expect(iysf.contact_person).toEqual(payload.contact_person);
    expect(iysf.requirements).toEqual(payload.requirements);
  });
});
