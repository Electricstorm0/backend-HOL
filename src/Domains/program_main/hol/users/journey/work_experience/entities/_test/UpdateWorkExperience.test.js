const UpdateExp = require('../UpdateWorkExperience');

describe('UpdateExp entity', () => {
  it('should create UpdateExp entity correctly when given valid payload', () => {
    // Arrange
    const payload = {
      companyName: 'Tech Corp',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      position: 'Backend Developer',
    };

    // Act
    const updateExp = new UpdateExp(payload);

    // Assert
    expect(updateExp.company_name).toBe(payload.companyName);
    expect(updateExp.start_date).toEqual(payload.startDate);
    expect(updateExp.end_date).toEqual(payload.endDate);
    expect(updateExp.position).toBe(payload.position);
  });

  it('should throw error when a required property is missing', () => {
    // Arrange
    const payload = {
      companyName: 'Tech Corp',
      startDate: new Date('2023-01-01'),
      // endDate missing
      position: 'Backend Developer',
    };

    // Act & Assert
    expect(() => new UpdateExp(payload)).toThrowError('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should accept any data type without type checking', () => {
    // Arrange
    const payload = {
      companyName: 123, // wrong type but no type check in class
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      position: 'Backend Developer',
    };

    // Act
    const updateExp = new UpdateExp(payload);

    // Assert: it still constructs the object because no type checking
    expect(updateExp.company_name).toBe(payload.companyName);
    expect(updateExp.start_date).toEqual(payload.startDate);
    expect(updateExp.end_date).toEqual(payload.endDate);
    expect(updateExp.position).toBe(payload.position);
  });
});
