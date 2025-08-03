const HOLGetUsersUniversities = require('../HOLGetUsersUniversities'); // Adjust path as needed

describe('HOLGetUsersUniversities', () => {
  describe('Constructor', () => {
    it('should create an instance with valid payload', () => {
      // Arrange
      const mockPayload = {
        id: 123,
        collage_year: 2024,
        universitiesDetail: {
          name: 'Harvard University',
          location: 'Cambridge, MA',
          ranking: 1,
        },
      };

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance).toBeInstanceOf(HOLGetUsersUniversities);
      expect(instance.usersUniverisitiesId).toBe(123);
      expect(instance.collageYear).toBe(2024);
      expect(instance.universitiesDetail).toEqual({
        name: 'Harvard University',
        location: 'Cambridge, MA',
        ranking: 1,
      });
    });

    it('should handle string id', () => {
      // Arrange
      const mockPayload = {
        id: '456',
        collage_year: 2023,
        universitiesDetail: { name: 'MIT' },
      };

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance.usersUniverisitiesId).toBe('456');
    });

    it('should handle null universitiesDetail', () => {
      // Arrange
      const mockPayload = {
        id: 789,
        collage_year: 2022,
        universitiesDetail: null,
      };

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance.universitiesDetail).toBeNull();
    });

    it('should handle undefined universitiesDetail', () => {
      // Arrange
      const mockPayload = {
        id: 101,
        collage_year: 2021,
        universitiesDetail: undefined,
      };

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance.universitiesDetail).toBeUndefined();
    });

    it('should handle empty universitiesDetail object', () => {
      // Arrange
      const mockPayload = {
        id: 202,
        collage_year: 2020,
        universitiesDetail: {},
      };

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance.universitiesDetail).toEqual({});
    });

    it('should handle missing properties in payload', () => {
      // Arrange
      const mockPayload = {};

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance.usersUniverisitiesId).toBeUndefined();
      expect(instance.collageYear).toBeUndefined();
      expect(instance.universitiesDetail).toBeUndefined();
    });

    it('should handle partial payload', () => {
      // Arrange
      const mockPayload = {
        id: 303,
        collage_year: 2019,
        // universitiesDetail is missing
      };

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance.usersUniverisitiesId).toBe(303);
      expect(instance.collageYear).toBe(2019);
      expect(instance.universitiesDetail).toBeUndefined();
    });

    it('should handle complex universitiesDetail object', () => {
      // Arrange
      const complexUniversitiesDetail = {
        name: 'Stanford University',
        location: 'Stanford, CA',
        ranking: 2,
        departments: ['Engineering', 'Medicine', 'Business'],
        founded: 1885,
        isPublic: false,
        tuition: {
          inState: 56169,
          outOfState: 56169,
        },
      };

      const mockPayload = {
        id: 404,
        collage_year: 2025,
        universitiesDetail: complexUniversitiesDetail,
      };

      // Act
      const instance = new HOLGetUsersUniversities(mockPayload);

      // Assert
      expect(instance.universitiesDetail).toEqual(complexUniversitiesDetail);
      expect(instance.universitiesDetail.departments).toHaveLength(3);
      expect(instance.universitiesDetail.tuition.inState).toBe(56169);
    });

    it('should not modify the original payload', () => {
      // Arrange
      const originalPayload = {
        id: 505,
        collage_year: 2024,
        universitiesDetail: { name: 'Original University' },
      };
      const payloadCopy = { ...originalPayload };

      // Act
      const instance = new HOLGetUsersUniversities(originalPayload);
      instance.usersUniverisitiesId = 999; // Modify instance

      // Assert
      expect(originalPayload).toEqual(payloadCopy); // Original should be unchanged
    });
  });

  describe('Property assignments', () => {
    it('should correctly map id to usersUniverisitiesId', () => {
      const payload = { id: 'test-id', collage_year: 2024, universitiesDetail: {} };
      const instance = new HOLGetUsersUniversities(payload);

      expect(instance.usersUniverisitiesId).toBe('test-id');
    });

    it('should correctly map collage_year to collageYear', () => {
      const payload = { id: 1, collage_year: 2023, universitiesDetail: {} };
      const instance = new HOLGetUsersUniversities(payload);

      expect(instance.collageYear).toBe(2023);
    });

    it('should correctly assign universitiesDetail', () => {
      const detail = { university: 'Test University' };
      const payload = { id: 1, collage_year: 2024, universitiesDetail: detail };
      const instance = new HOLGetUsersUniversities(payload);

      expect(instance.universitiesDetail).toBe(detail);
    });
  });
});
