const HOLUsersWorkExpRepository = require('../work_experience/HOLUsersWorkExpRepository');

describe('HOL Users Work Experience interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersWorkExperienceRepository = new HOLUsersWorkExpRepository();

    // Action and Assert
    await expect(usersWorkExperienceRepository.create(' ')).rejects.toThrowError('HOL_USERS_EXPERIENCES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersWorkExperienceRepository.update(' ')).rejects.toThrowError('HOL_USERS_EXPERIENCES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersWorkExperienceRepository.delete(' ')).rejects.toThrowError('HOL_USERS_EXPERIENCES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersWorkExperienceRepository.readByUsersId(' ')).rejects.toThrowError('HOL_USERS_EXPERIENCES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
