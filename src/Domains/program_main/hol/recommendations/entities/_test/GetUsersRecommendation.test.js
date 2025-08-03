const getUsersRecommendation = require('../GetUsersRecommendation');

describe('Get Users Recommendation entities', () => {
  it('should create getUsersRecommendation entity correctly', () => {
    // Arrange
    const payload = {
      Alumni_Name: 'Burhanudin Malik',
      Program: 'Teknik Informatika',
      Batch: 'TI-21',
      Year: '2025',
      deadline: new Date('2025-12-01'),
      status: 'diajukan',
    };

    // Action
    const usersRecommendation = new getUsersRecommendation(payload);

    // Assert
    expect(usersRecommendation).toBeInstanceOf(getUsersRecommendation);
    expect(usersRecommendation.alumniName).toEqual(payload.Alumni_Name);
    expect(usersRecommendation.program).toEqual(payload.Program);
    expect(usersRecommendation.batch).toEqual(payload.Batch);
    expect(usersRecommendation.year).toEqual(payload.Year);
    expect(usersRecommendation.deadline).toEqual(payload.deadline);
    expect(usersRecommendation.status).toEqual(payload.status);
  });
});
