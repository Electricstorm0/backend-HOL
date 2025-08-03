const HOLUpdateUniversities = require('../HOLUpdateUniversities'); // Sesuaikan path sesuai struktur folder

describe('HOLUpdateUniversities', () => {
  describe('Constructor', () => {
    it('should create an instance with valid payload', () => {
      // Arrange - Persiapan data
      const mockPayload = {
        universitiesName: 'Universitas Indonesia',
        universitiesType: 'Negeri',
        universitiesProvincesId: 'PROV001',
        universitiesRegenciesId: 'REG001',
      };

      // Act - Eksekusi
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert - Verifikasi
      expect(instance).toBeInstanceOf(HOLUpdateUniversities);
      expect(instance.name).toBe('Universitas Indonesia');
      expect(instance.type).toBe('Negeri');
      expect(instance.id_province).toBe('PROV001');
      expect(instance.id_regencie).toBe('REG001');
    });

    it('should handle empty string universitiesProvincesId by converting to null', () => {
      // Arrange
      const mockPayload = {
        universitiesName: 'Institut Teknologi Bandung',
        universitiesType: 'Negeri',
        universitiesProvincesId: '', // String kosong
        universitiesRegenciesId: 'REG002',
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.id_province).toBeNull();
      expect(instance.id_regencie).toBe('REG002');
    });

    it('should handle empty string universitiesRegenciesId by converting to null', () => {
      // Arrange
      const mockPayload = {
        universitiesName: 'Universitas Gadjah Mada',
        universitiesType: 'Negeri',
        universitiesProvincesId: 'PROV003',
        universitiesRegenciesId: '', // String kosong
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.id_province).toBe('PROV003');
      expect(instance.id_regencie).toBeNull();
    });

    it('should handle both universitiesProvincesId and universitiesRegenciesId as empty strings', () => {
      // Arrange
      const mockPayload = {
        universitiesName: 'Universitas Airlangga',
        universitiesType: 'Negeri',
        universitiesProvincesId: '', // String kosong
        universitiesRegenciesId: '', // String kosong
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.name).toBe('Universitas Airlangga');
      expect(instance.type).toBe('Negeri');
      expect(instance.id_province).toBeNull();
      expect(instance.id_regencie).toBeNull();
    });

    it('should handle null values in payload', () => {
      // Arrange
      const mockPayload = {
        universitiesName: null,
        universitiesType: null,
        universitiesProvincesId: null,
        universitiesRegenciesId: null,
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.name).toBeNull();
      expect(instance.type).toBeNull();
      expect(instance.id_province).toBeNull();
      expect(instance.id_regencie).toBeNull();
    });

    it('should handle undefined values in payload', () => {
      // Arrange
      const mockPayload = {
        universitiesName: undefined,
        universitiesType: undefined,
        universitiesProvincesId: undefined,
        universitiesRegenciesId: undefined,
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.name).toBeUndefined();
      expect(instance.type).toBeUndefined();
      expect(instance.id_province).toBeUndefined();
      expect(instance.id_regencie).toBeUndefined();
    });

    it('should handle missing properties in payload', () => {
      // Arrange
      const mockPayload = {}; // Payload kosong

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.name).toBeUndefined();
      expect(instance.type).toBeUndefined();
      expect(instance.id_province).toBeUndefined();
      expect(instance.id_regencie).toBeUndefined();
    });

    it('should handle partial payload', () => {
      // Arrange
      const mockPayload = {
        universitiesName: 'Universitas Brawijaya',
        universitiesType: 'Negeri',
        // universitiesProvincesId dan universitiesRegenciesId tidak ada
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.name).toBe('Universitas Brawijaya');
      expect(instance.type).toBe('Negeri');
      expect(instance.id_province).toBeUndefined();
      expect(instance.id_regencie).toBeUndefined();
    });

    it('should handle numeric IDs', () => {
      // Arrange
      const mockPayload = {
        universitiesName: 'Institut Pertanian Bogor',
        universitiesType: 'Negeri',
        universitiesProvincesId: 123,
        universitiesRegenciesId: 456,
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.id_province).toBe(123);
      expect(instance.id_regencie).toBe(456);
    });

    it('should handle boolean false as valid value (not empty string)', () => {
      // Arrange
      const mockPayload = {
        universitiesName: 'Universitas Test',
        universitiesType: 'Swasta',
        universitiesProvincesId: false,
        universitiesRegenciesId: 0,
      };

      // Act
      const instance = new HOLUpdateUniversities(mockPayload);

      // Assert
      expect(instance.id_province).toBe(false); // false !== '', jadi tidak diubah ke null
      expect(instance.id_regencie).toBe(0); // 0 !== '', jadi tidak diubah ke null
    });
  });

  describe('Property mapping', () => {
    it('should correctly map universitiesName to name', () => {
      const payload = {
        universitiesName: 'Test University',
        universitiesType: 'Private',
        universitiesProvincesId: 'P001',
        universitiesRegenciesId: 'R001',
      };
      const instance = new HOLUpdateUniversities(payload);

      expect(instance.name).toBe('Test University');
    });

    it('should correctly map universitiesType to type', () => {
      const payload = {
        universitiesName: 'Test University',
        universitiesType: 'Public',
        universitiesProvincesId: 'P001',
        universitiesRegenciesId: 'R001',
      };
      const instance = new HOLUpdateUniversities(payload);

      expect(instance.type).toBe('Public');
    });

    it('should correctly map universitiesProvincesId to id_province', () => {
      const payload = {
        universitiesName: 'Test University',
        universitiesType: 'Private',
        universitiesProvincesId: 'PROVINCE123',
        universitiesRegenciesId: 'R001',
      };
      const instance = new HOLUpdateUniversities(payload);

      expect(instance.id_province).toBe('PROVINCE123');
    });

    it('should correctly map universitiesRegenciesId to id_regencie', () => {
      const payload = {
        universitiesName: 'Test University',
        universitiesType: 'Private',
        universitiesProvincesId: 'P001',
        universitiesRegenciesId: 'REGENCY456',
      };
      const instance = new HOLUpdateUniversities(payload);

      expect(instance.id_regencie).toBe('REGENCY456');
    });
  });

  describe('Empty string conversion logic', () => {
    it('should only convert empty strings to null, not other falsy values', () => {
      const testCases = [
        { input: '', expected: null }, // String kosong -> null
        { input: '0', expected: '0' }, // String '0' -> tetap '0'
        { input: 0, expected: 0 }, // Number 0 -> tetap 0
        { input: false, expected: false }, // Boolean false -> tetap false
        { input: null, expected: null }, // null -> tetap null
        { input: undefined, expected: undefined }, // undefined -> tetap undefined
        { input: 'valid', expected: 'valid' }, // String valid -> tetap string
      ];

      testCases.forEach(({ input, expected }) => {
        const payload = {
          universitiesName: 'Test',
          universitiesType: 'Test',
          universitiesProvincesId: input,
          universitiesRegenciesId: 'REG001',
        };

        const instance = new HOLUpdateUniversities(payload);
        expect(instance.id_province).toBe(expected);
      });
    });
  });
});
