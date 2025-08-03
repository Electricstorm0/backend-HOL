const HOLUpdateUsersUniversities = require('../HOLUpdateUsersUniversities'); // Sesuaikan path sesuai struktur folder

describe('HOLUpdateUsersUniversities', () => {
  describe('Constructor', () => {
    it('should create an instance with valid payload', () => {
      // Arrange - Persiapan data
      const mockPayload = {
        usersUniversitiesId: 'USER_UNIV_001',
        universitiesMajorId: 'MAJOR_123',
        collageYear: 2024,
      };

      // Act - Eksekusi
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert - Verifikasi
      expect(instance).toBeInstanceOf(HOLUpdateUsersUniversities);
      expect(instance.id).toBe('USER_UNIV_001');
      expect(instance.id_major_universities).toBe('MAJOR_123');
      expect(instance.collage_year).toBe(2024);
    });

    it('should handle numeric IDs', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: 12345,
        universitiesMajorId: 67890,
        collageYear: 2023,
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBe(12345);
      expect(instance.id_major_universities).toBe(67890);
      expect(instance.collage_year).toBe(2023);
    });

    it('should handle string collageYear', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: 'USER001',
        universitiesMajorId: 'MAJOR001',
        collageYear: '2022', // String tahun
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBe('USER001');
      expect(instance.id_major_universities).toBe('MAJOR001');
      expect(instance.collage_year).toBe('2022');
    });

    it('should handle null values in payload', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: null,
        universitiesMajorId: null,
        collageYear: null,
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBeNull();
      expect(instance.id_major_universities).toBeNull();
      expect(instance.collage_year).toBeNull();
    });

    it('should handle undefined values in payload', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: undefined,
        universitiesMajorId: undefined,
        collageYear: undefined,
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBeUndefined();
      expect(instance.id_major_universities).toBeUndefined();
      expect(instance.collage_year).toBeUndefined();
    });

    it('should handle empty payload', () => {
      // Arrange
      const mockPayload = {}; // Payload kosong

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBeUndefined();
      expect(instance.id_major_universities).toBeUndefined();
      expect(instance.collage_year).toBeUndefined();
    });

    it('should handle partial payload with only usersUniversitiesId', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: 'PARTIAL_001',
        // universitiesMajorId dan collageYear tidak ada
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBe('PARTIAL_001');
      expect(instance.id_major_universities).toBeUndefined();
      expect(instance.collage_year).toBeUndefined();
    });

    it('should handle partial payload with only universitiesMajorId', () => {
      // Arrange
      const mockPayload = {
        universitiesMajorId: 'MAJOR_ONLY_001',
        // usersUniversitiesId dan collageYear tidak ada
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBeUndefined();
      expect(instance.id_major_universities).toBe('MAJOR_ONLY_001');
      expect(instance.collage_year).toBeUndefined();
    });

    it('should handle partial payload with only collageYear', () => {
      // Arrange
      const mockPayload = {
        collageYear: 2025,
        // usersUniversitiesId dan universitiesMajorId tidak ada
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBeUndefined();
      expect(instance.id_major_universities).toBeUndefined();
      expect(instance.collage_year).toBe(2025);
    });

    it('should handle empty string values', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: '',
        universitiesMajorId: '',
        collageYear: '',
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBe('');
      expect(instance.id_major_universities).toBe('');
      expect(instance.collage_year).toBe('');
    });

    it('should handle zero values', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: 0,
        universitiesMajorId: 0,
        collageYear: 0,
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBe(0);
      expect(instance.id_major_universities).toBe(0);
      expect(instance.collage_year).toBe(0);
    });

    it('should handle boolean values', () => {
      // Arrange
      const mockPayload = {
        usersUniversitiesId: true,
        universitiesMajorId: false,
        collageYear: true,
      };

      // Act
      const instance = new HOLUpdateUsersUniversities(mockPayload);

      // Assert
      expect(instance.id).toBe(true);
      expect(instance.id_major_universities).toBe(false);
      expect(instance.collage_year).toBe(true);
    });

    it('should not modify the original payload', () => {
      // Arrange
      const originalPayload = {
        usersUniversitiesId: 'ORIGINAL_001',
        universitiesMajorId: 'MAJOR_ORIGINAL',
        collageYear: 2024,
      };
      const payloadCopy = { ...originalPayload };

      // Act
      const instance = new HOLUpdateUsersUniversities(originalPayload);
      instance.id = 'MODIFIED'; // Modifikasi instance

      // Assert
      expect(originalPayload).toEqual(payloadCopy); // Payload asli tidak berubah
    });
  });

  describe('Property mapping', () => {
    it('should correctly map usersUniversitiesId to id', () => {
      const payload = {
        usersUniversitiesId: 'TEST_ID_123',
        universitiesMajorId: 'MAJOR_456',
        collageYear: 2024,
      };
      const instance = new HOLUpdateUsersUniversities(payload);

      expect(instance.id).toBe('TEST_ID_123');
    });

    it('should correctly map universitiesMajorId to id_major_universities', () => {
      const payload = {
        usersUniversitiesId: 'USER_001',
        universitiesMajorId: 'MAJOR_MAPPING_TEST',
        collageYear: 2024,
      };
      const instance = new HOLUpdateUsersUniversities(payload);

      expect(instance.id_major_universities).toBe('MAJOR_MAPPING_TEST');
    });

    it('should correctly map collageYear to collage_year', () => {
      const payload = {
        usersUniversitiesId: 'USER_001',
        universitiesMajorId: 'MAJOR_001',
        collageYear: 2026,
      };
      const instance = new HOLUpdateUsersUniversities(payload);

      expect(instance.collage_year).toBe(2026);
    });
  });

  describe('Data type preservation', () => {
    it('should preserve different data types correctly', () => {
      const testCases = [
        {
          description: 'string values',
          payload: {
            usersUniversitiesId: 'string_id',
            universitiesMajorId: 'major_string',
            collageYear: 'year_string',
          },
          expected: {
            id: 'string_id',
            id_major_universities: 'major_string',
            collage_year: 'year_string',
          },
        },
        {
          description: 'number values',
          payload: {
            usersUniversitiesId: 123,
            universitiesMajorId: 456,
            collageYear: 2024,
          },
          expected: {
            id: 123,
            id_major_universities: 456,
            collage_year: 2024,
          },
        },
        {
          description: 'mixed data types',
          payload: {
            usersUniversitiesId: 'USER_789',
            universitiesMajorId: 999,
            collageYear: '2023',
          },
          expected: {
            id: 'USER_789',
            id_major_universities: 999,
            collage_year: '2023',
          },
        },
      ];

      testCases.forEach(({ description, payload, expected }) => {
        const instance = new HOLUpdateUsersUniversities(payload);

        expect(instance.id).toBe(expected.id);
        expect(instance.id_major_universities).toBe(expected.id_major_universities);
        expect(instance.collage_year).toBe(expected.collage_year);
      });
    });
  });
});
