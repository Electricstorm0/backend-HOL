const GetCFF = require('../GetCFF');

describe('Get CFF entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'Program Fellowship',
      // properti lain tidak lengkap
    };

    // Action & Assert
    expect(() => new GetCFF(payload)).toThrowError('GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type specification', () => {
    // Arrange
    const payload = {
      id_events_hol: 1,
      id_hol_events_type: 2,
      name: 'Program Fellowship',
      deadline: new Date('2025-12-31'),
      duration: 3,
      id_regencies: 10,
      description: 'Program intensif fellowship',
      benefit: 'sertifikat dan pengalaman',
      contact_person: 'John Doe - 08123456789',
      picture_url: 'http://example.com/logo.png',
      position: 'Fellow',
      category: 'Fellowship',
      placements: 'DKI Jakarta',
      register_url: 'http://example.com/register',
      requirements: 'Mahasiswa aktif semester 6 ke atas',
    };

    // Action & Assert
    expect(() => new GetCFF(payload)).toThrowError('GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create GetCFF entity correctly', () => {
    // Arrange
    const payload = {
      id_events_hol: 1,
      id_hol_events_type: 2,
      name: 'Program Fellowship',
      deadline: new Date('2025-12-31'),
      duration: '3 bulan',
      id_regencies: 10,
      description: 'Program intensif fellowship',
      benefit: 'sertifikat dan pengalaman',
      contact_person: 'John Doe - 08123456789',
      picture_url: 'http://example.com/logo.png',
      position: 'Fellow',
      category: 'Fellowship',
      placements: 'DKI Jakarta',
      register_url: 'http://example.com/register',
      requirements: 'Mahasiswa aktif semester 6 ke atas',
    };

    // Action
    const cff = new GetCFF(payload);

    // Assert
    expect(cff).toBeInstanceOf(GetCFF);
    expect(cff.callForFellowsId).toEqual(payload.id_events_hol);
    expect(cff.HolEventTypeId).toEqual(payload.id_hol_events_type);
    expect(cff.pictureUrl).toEqual(payload.picture_url);
    expect(cff.name).toEqual(payload.name);
    expect(cff.position).toEqual(payload.position);
    expect(cff.category).toEqual(payload.category);
    expect(cff.placements).toEqual(payload.placements);
    expect(cff.regenciesId).toEqual(payload.id_regencies);
    expect(cff.deadline).toEqual(payload.deadline);
    expect(cff.duration).toEqual(payload.duration);
    expect(cff.description).toEqual(payload.description);
    expect(cff.requirements).toEqual(payload.requirements);
    expect(cff.benefit).toEqual(payload.benefit);
    expect(cff.register_url).toEqual(payload.register_url);
    expect(cff.contact_person).toEqual(payload.contact_person);
  });
});
