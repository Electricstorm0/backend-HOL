const HOLUpdateUsersDomicile = require('../HOLUpdateUsersDomicile');

describe('HOLUpdateUsersDomicile entity', () => {
  it('should create HOLUpdateUsersDomicile entity correctly with valid payload', () => {
    // Arrange
    const payload = {
      usersDomicileId: 10,
      completeAddress: 'Jl. Merdeka No. 123',
      provinceId: 5,
      regenciesId: 12,
    };

    // Act
    const result = new HOLUpdateUsersDomicile(payload);

    // Assert
    expect(result.id).toBe(payload.usersDomicileId);
    expect(result.complete_address).toBe(payload.completeAddress);
    expect(result.id_provincies).toBe(payload.provinceId);
    expect(result.id_regencies).toBe(payload.regenciesId);
  });

  it('should still create entity even if optional properties are undefined', () => {
    // Arrange
    const payload = {
      usersDomicileId: 1,
      completeAddress: 'Tanpa regency dan province',
      provinceId: undefined,
      regenciesId: undefined,
    };

    // Act
    const result = new HOLUpdateUsersDomicile(payload);

    // Assert
    expect(result.id).toBe(payload.usersDomicileId);
    expect(result.complete_address).toBe(payload.completeAddress);
    expect(result.id_provincies).toBeUndefined();
    expect(result.id_regencies).toBeUndefined();
  });

  it('should assign null to missing optional properties if undefined is replaced by null', () => {
    const payload = {
      usersDomicileId: 99,
      completeAddress: 'Jl. Testing 456',
      provinceId: null,
      regenciesId: null,
    };

    const result = new HOLUpdateUsersDomicile(payload);

    expect(result.id).toBe(99);
    expect(result.id_provincies).toBeNull();
    expect(result.id_regencies).toBeNull();
  });
});
