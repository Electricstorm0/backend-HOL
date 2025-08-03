const GetExp = require('../GetWorkExperience');

describe('GetExp entity', () => {
  it('should create GetExp entity correctly when given valid payload', () => {
    // Arrange
    const payload = {
      id: 1,
      id_users_hol: 101,
      company_name: 'Tech Corp',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-12-31'),
      position: 'Software Engineer',
    };

    // Act
    const experience = new GetExp(payload);

    // Assert
    expect(experience.workExperienceId).toBe(payload.id);
    expect(experience.usersId).toBe(payload.id_users_hol);
    expect(experience.companyName).toBe(payload.company_name);
    expect(experience.startDate).toEqual(payload.start_date);
    expect(experience.endDate).toEqual(payload.end_date);
    expect(experience.position).toBe(payload.position);
  });

  it('should throw error when required property is missing', () => {
    // Arrange
    const invalidPayload = {
      id: 1,
      id_users_hol: 101,
      // company_name missing
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-12-31'),
      position: 'Software Engineer',
    };

    // Act & Assert
    expect(() => new GetExp(invalidPayload)).toThrowError('GET_USERS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when property has wrong data type', () => {
    // Arrange
    const invalidPayload = {
      id: 1,
      id_users_hol: '101', // should be number
      company_name: 'Tech Corp',
      start_date: '2023-01-01', // should be Date object
      end_date: new Date('2023-12-31'),
      position: 'Software Engineer',
    };

    // Act & Assert
    expect(() => new GetExp(invalidPayload)).toThrowError('GET_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
